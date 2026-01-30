// Get elements
const rollBtn = document.getElementById("rollBtn");
const diceCountInput = document.getElementById("diceCount");
const diceSidesInput = document.getElementById("diceSides");
const rollsText = document.getElementById("rolls");
const totalText = document.getElementById("total");
const totalWithProfText = document.getElementById("totalWithProf");
const duplicatesText = document.getElementById("duplicates");

const rerollOnesCheckbox = document.getElementById("rerollOnes");
const rerollLabel = document.getElementById("rerollLabel");

const useProficiencyCheckbox = document.getElementById("useProficiency");
const proficiencyInput = document.getElementById("proficiencyValue");
const proficiencyLabel = document.getElementById("proficiencyLabel");

// Toggle reroll 1s opacity
rerollOnesCheckbox.addEventListener("change", () => {
  const isChecked = rerollOnesCheckbox.checked;
  rerollLabel.style.opacity = isChecked ? "1" : "0.5";
});

// Toggle proficiency input and opacity
useProficiencyCheckbox.addEventListener("change", () => {
  const isChecked = useProficiencyCheckbox.checked;
  proficiencyInput.disabled = !isChecked;
  proficiencyLabel.style.opacity = isChecked ? "1" : "0.5";
  proficiencyInput.style.opacity = isChecked ? "1" : "0.5";
});

// Roll button click
rollBtn.addEventListener("click", () => {
  const diceCount = Number(diceCountInput.value);
  const diceSides = Number(diceSidesInput.value);

  const shouldRerollOnes = rerollOnesCheckbox.checked;
  const useProficiency = useProficiencyCheckbox.checked;
  const proficiency = Number(proficiencyInput.value) || 0;

  const rolls = [];
  let total = 0;
  const rerolledOnes = [];

  // Roll dice
  for (let i = 0; i < diceCount; i++) {
    let roll = Math.floor(Math.random() * diceSides) + 1;

    if (shouldRerollOnes && roll === 1) {
      const newRoll = Math.floor(Math.random() * diceSides) + 1;
      rerolledOnes.push(`1 → ${newRoll}`);
      roll = newRoll;
    }

    rolls.push(roll);
    total += roll;
  }

  // Count duplicates
  const counts = {};
  rolls.forEach(number => {
    counts[number] = (counts[number] || 0) + 1;
  });

  // Show rolls
  rollsText.textContent = `Rolls (d${diceSides}): ${rolls.join(", ")}`;

  // Show totals
  totalText.textContent = `Total: ${total}`;
  totalWithProfText.textContent = useProficiency
    ? `Total + proficiency (+${proficiency}): ${total + proficiency}`
    : "";

  // Show duplicates
  let duplicateMessage = "Same numbers: ";
  let hasDuplicates = false;
  for (let number in counts) {
    if (counts[number] > 1) {
      duplicateMessage += `${number} (${counts[number]} times) `;
      hasDuplicates = true;
    }
  }
  duplicatesText.textContent = hasDuplicates
    ? duplicateMessage
    : "No Duplicates";

  // Show rerolled 1s
  if (rerolledOnes.length > 0) {
    duplicatesText.textContent += ` | Re-rolled 1s: ${rerolledOnes.join(", ")}`;
  }
});
