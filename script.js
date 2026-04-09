// Navigation
function go(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.getElementById('p-' + id).classList.add('on');
  if (btn) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }
  window.scrollTo(0, 0);
}

// Track selection
function setTrack(id, el) {
  document.querySelectorAll('.path-card').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  document.querySelectorAll('.roadmap').forEach(r => r.classList.remove('on'));
  document.getElementById('rm-' + id).classList.add('on');
}

// Tutorial accordion
function toggleTut(header) {
  header.parentElement.classList.toggle('open');
}

// Tutorial filtering
function setTutTrack(track, btn) {
  document.querySelectorAll('.track-tab').forEach(t => t.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.tut-card').forEach(c => {
    c.style.display = (track === 'all' || c.dataset.track === track) ? '' : 'none';
  });
}

// Prompt templates for each task type
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

// Demo functionality - calls backend API
async function runDemo() {
  const input = document.getElementById('d-input').value.trim();
  const task = document.getElementById('d-task').value;
  const btn = document.getElementById('d-btn');
  const out = document.getElementById('d-out');

  if (!input) {
    out.innerHTML = '<span class="demo-placeholder">Please enter a clinical scenario first.</span>';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Running...';
  out.innerHTML = '<span class="demo-placeholder">Contacting Claude API...</span>';

  try {
    // Call our backend API endpoint
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: task,
        input: input
      })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      out.innerHTML = `<span class="demo-placeholder">Error: ${data.error}</span>`;
    } else {
      // Format the response text with basic HTML formatting
      const text = data.response || 'No response received.';
      out.innerHTML = text
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
  } catch(e) {
    console.error('Demo error:', e);
    out.innerHTML = '<span class="demo-placeholder">Connection error. Make sure the backend server is running and try again.</span>';
  }

  btn.disabled = false;
  btn.textContent = 'Run with Claude';
}
