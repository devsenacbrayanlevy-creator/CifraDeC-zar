// Referências aos elementos HTML
const inputText = document.getElementById("inputText");
const ooutputText = document.getElementById("outputText");
const shiftValue = document.getElementById("shiftValue");
const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");
const modeRadios = document.querySelectorAll('input[name="mode"]');

// Conjuto de alfabetos suportados pela aplicação
const alphabets = {
  latin: "abcdefghijklmnopqrstuvwxyz",
};

//Obtém o módulo selecionado
function getSelectMode() {
  return document.querySelector('input[name="mode:checked').value;
}

// Normalizar o valor do deslocamento para um número válido
function normalizeValue(value) {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
}

// Aplicar a cifra de Cezar no texto informado
function transformText(text, shift, mode) {
  const alphabet = alphabets.latin;
  const maxIndex = alphabet.length;
  const direction = mode === "decode" ? -1 : 1;
  const offset = ((shift % maxIndex) + maxIndex) % maxIndex;

  return text
    .split("")
    .map((char) => {
      const lower = char.toLowerCase();
      const idx = alphabet.indexOf(lower);

      //Retorna o próprio carctere se não fizer parte do alfabeto
      if (idx === -1) {
        return char;
      }

      // Calcular a nova posição dentro do alfabeto
      const newIndex = (idx + direction * offset + maxIndex) % maxIndex;
      const transformed = alphabet[newIndex];

      //Preserva maiuscula e minuscula
      return char === lower ? transformed : transformed.toLocaleUpperCase();
    })
    .join("");
}

//Atualiza  o texto de resultado com base na entrada atual
function updateResult() {
  const text = inputText.value;
  const shift = normalizeValue(shiftValue.value);
  const mode = getSelectedMode();

  outputText.textContent =
    transformText(text, shift, mode) || "Digite um texto para ver o resultado";
}

// Função para copiar o resultado para a área de trasnferencia
function copyResult() {
  const result = outputText.textContent;
  if (!result) return;

  navigation.clipboard
    .writeText(result)
    .then(() => {
      copyButton.textContent = "Copiado";
      setTimeout(() => {
        copyButton.textContent = "Copiar";
      }, 1200);
    })
    .catch(() => {
      copyButton.textContent = "Erro";
      setTimeout(() => {
        copyButton.textContent = "Copiar";
      }, 1200);
    });
}

//Redefinir o formulário para o estado inicial
function resetForm() {
  inputText.value = "";
  shiftValue.value = "2";
  modeRadios[0].checked = true;
  updateResult();
}

// Eventos de interação do usuário
inputText.addEventListener("input", updateResult);
shiftValue.addEventListener("input", updateResult);
modeRadios.forEach((radio) => radio.addEventListener("change", updateResult));
copyButton.addEventListener("click", copyResult);
resetButton.addEventListener("click", resetForm);
