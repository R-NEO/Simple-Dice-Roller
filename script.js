
const rollBtn = document.getElementById("rollBtn");
const diceCountInput = document.getElementById("diceCount");
const diceSidesInput = document.getElementById("diceSides");
const rollsText = document.getElementById("rolls");
const totalText = document.getElementById("total");
const duplicatesText = document.getElementById("duplicates");
const rerollOnesCheckbox = document.getElementById("rerollOnes");

// button 
rollBtn.addEventListener("click", () => {
  const diceCount = Number(diceCountInput.value);
  const diceSides = Number(diceSidesInput.value);
  const shouldRerollOnes = rerollOnesCheckbox.checked;

  const rolls = [];
  let total = 0;
  const rerolledOnes = [];

  // Roll
  for (let i = 0; i < diceCount; i++) {
    let roll = Math.floor(Math.random() * diceSides) + 1;

    // Optional re-roll 1s
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

  // Show rolls and total
  rollsText.textContent = `Rolls (d${diceSides}): ${rolls.join(", ")}`;
  totalText.textContent = `Total: ${total}`;

  // Show duplicate info
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

  // Show re-rolled 1s if any
  if (rerolledOnes.length > 0) {
    duplicatesText.textContent += ` | Re-rolled 1s: ${rerolledOnes.join(", ")}`;
  }
});
