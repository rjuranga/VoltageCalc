function openCalc(evt, calcName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  const tablinks = document.getElementsByClassName("tablinks");

  for (let content of tabcontent) content.style.display = "none";
  for (let link of tablinks) link.className = link.className.replace(" active", "");

  document.getElementById(calcName).style.display = "block";
  evt.currentTarget.className += " active";
}

let currentMultiplier = 1;

document.addEventListener('DOMContentLoaded', () => {
  ['amps', 'va'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        id === 'amps' ? calculateAmpsToVA() : calculateVAToAmps();
      }
    });
  });

  ['voltage1', 'voltage2'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      id === 'voltage1' ? calculateAmpsToVA() : calculateVAToAmps();
    });
  });

  document.querySelectorAll('.va-multiplier input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => toggleVAMultiplier(cb));
  });

  document.getElementById('va').addEventListener('input', () => {
    const input = document.getElementById('va');
    if (currentMultiplier !== 1) {
      input.dataset.baseVa = parseFloat(input.value) / currentMultiplier || 0;
    } else {
      input.dataset.baseVa = input.value;
    }
  });
});

function calculateAmpsToVA() {
  const current = parseFloat(document.getElementById('amps').value) || 0;
  const voltage = document.getElementById('voltage1').value;
  let vaTotal = 0, perPhase = 0;

  if (voltage === '277') {
    vaTotal = current * 277;
    perPhase = vaTotal;
  } else if (voltage === '480-1ph') {
    vaTotal = current * 480;
    perPhase = vaTotal / 2;
  } else if (voltage === '480-3ph') {
    vaTotal = current * 480 * Math.sqrt(3);
    perPhase = vaTotal / 3;
  }

  document.getElementById('total-va-result').textContent = `Total Volt-Amperes: ${Math.ceil(vaTotal)} VA`;
  document.getElementById('per-phase-va-result').textContent = `Per Phase Volt-Amperes: ${Math.ceil(perPhase)} VA`;
  document.getElementById('vaInput').value = Math.ceil(perPhase);
  calculate();
}

function calculateVAToAmps() {
  const va = parseFloat(document.getElementById('va').value) || 0;
  const voltage = document.getElementById('voltage2').value;
  let amps = 0, perPhase = 0;

  if (voltage === '277') {
    amps = va / 277;
    perPhase = va;
  } else if (voltage === '480-1ph') {
    amps = va / 480;
    perPhase = va / 2;
  } else if (voltage === '480-3ph') {
    amps = va / (480 * Math.sqrt(3));
    perPhase = va / 3;
  }

  document.getElementById('amps-result').textContent = `Current (Amps): ${Math.ceil(amps)}`;
  document.getElementById('va-per-phase-result').textContent = `Per Phase Volt-Amperes: ${Math.ceil(perPhase)} VA`;
  document.getElementById('vaInput').value = Math.ceil(perPhase);
  calculate();
}

function calculate() {
  const va = parseInt(document.getElementById('vaInput').value);
  const result = vaRanges[0].find(range => va >= range.min && va <= range.max);

  if (result) {
    document.getElementById('breakerSize').textContent = `Circuit Breaker: ${result.breaker}`;
    document.getElementById('wireSize').textContent = `Wire Size Range: ${result.wire}`;
    document.getElementById('awgConfig').textContent = `AWG Configuration: ${result.awg}`;
    document.getElementById('result').style.display = 'block';
  } else {
    alert('VA value out of range. Please enter a value between 1 and 221600.');
  }
}

function copyAWG() {
  const awgConfig = document.getElementById('awgConfig').textContent.split(': ')[1];
  navigator.clipboard.writeText(awgConfig).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function toggleVAMultiplier(checkbox) {
  const vaInput = document.getElementById('va');

  if (checkbox.checked) {
    document.querySelectorAll('.va-multiplier input[type="checkbox"]').forEach(cb => {
      if (cb !== checkbox) cb.checked = false;
    });

    if (!vaInput.dataset.baseVa) {
      vaInput.dataset.baseVa = vaInput.value || 0;
    }

    const base = parseFloat(vaInput.dataset.baseVa) || 0;
    currentMultiplier = parseFloat(checkbox.value);
    vaInput.value = (base * currentMultiplier).toFixed(2);
  } else {
    const base = parseFloat(vaInput.dataset.baseVa || vaInput.value) || 0;
    vaInput.value = base;
    currentMultiplier = 1;
    delete vaInput.dataset.baseVa;
  }

  calculateVAToAmps();
}
