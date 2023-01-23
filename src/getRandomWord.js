const getRandomWord = async () => {
  const { default: dictionnaire } = await import("./dictionnaire.json");

  const randomWord =
    dictionnaire[Math.floor(Math.random() * dictionnaire.length)];

  const mot = randomWord["mot"];

  if (mot === undefined || mot.length < 4 || mot.length > 9) {
    return await getRandomWord();
  } else {
    // sans accent, tout en majuscule
    const formatted = mot
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();

    return formatted;
  }
};

export default getRandomWord;
