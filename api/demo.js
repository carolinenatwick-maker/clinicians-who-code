// Serverless function for Vercel
// Handles Claude API calls securely without exposing API key to client

const PROMPTS = {
  soap: t => `You are a clinical documentation assistant. Write a complete, well-structured SOAP note from this scenario. Use standard clinical formatting with clear S, O, A, and P sections. Be specific in the Assessment and include a prioritized Plan:\n\n${t}`,
  ddx: t => `You are a clinical reasoning expert. Generate a prioritized differential diagnosis list (top 5-7) for this presentation. For each: (1) likelihood, (2) supporting features from the case, (3) distinguishing features, (4) recommended next diagnostic step:\n\n${t}`,
  hep: t => `You are a physical therapist. Create a structured, patient-friendly Home Exercise Program. For each exercise include: name, starting position, movement description, sets/reps/frequency, patient instructions written at a 7th-grade reading level, progression criteria, and precautions:\n\n${t}`,
  edu: t => `Convert this clinical scenario into patient education content. Write at a 6th-grade reading level. Use short sentences, avoid jargon, explain any medical terms used. Include: what is happening, why it matters, what the patient should do, and when to seek care urgently:\n\n${t}`,
  priorauth: t => `Write a professional prior authorization justification letter. Be concise, cite clinical necessity using objective findings, reference relevant evidence-based guidelines, and use formal medical language appropriate for insurance review:\n\n${t}`,
  progress: t => `You are a licensed mental health clinician. Write a session progress note using DAP format (Data, Assessment, Plan). Be clinically precise, use DSM-aligned language where appropriate, and document specific therapeutic interventions used:\n\n${t}`,
  protocol: t => `Create a structured clinical protocol outline for managing the condition described. Include: (1) assessment criteria and red flags, (2) initial workup, (3) treatment algorithm with decision points, (4) monitoring parameters, (5) escalation triggers, (6) patient education components:\n\n${t}`,
  research: t => `Summarize this research for a clinician. Include: (1) clinical question studied, (2) study design and population, (3) key findings in plain language, (4) limitations and risk of bias, (5) clinical takeaway — what should or should not change in practice. Flag any conflicts of interest:\n\n${t}`
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { task, input } = req.body;

    // Validate input
    if (!task || !input) {
      return res.status(400).json({ error: 'Missing task or input' });
    }

    if (!PROMPTS[task]) {
      return res.status(400).json({ error: 'Invalid task type' });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not set');
      return res.status(500).json({
        error: 'API key not configured. Please set ANTHROPIC_API_KEY environment variable.'
      });
    }

    // Build the prompt
    const prompt = PROMPTS[task](input);

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(response.status).json({
        error: `API request failed: ${response.status}`
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || 'No response received.';

    return res.status(200).json({ response: text });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
