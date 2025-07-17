// Se XP for menor do que 1.000 = Ferro
// Se XP for entre 1.001 e 2.000 = Bronze
// Se XP for entre 2.001 e 5.000 = Prata
// Se XP for entre 5.001 e 7.000 = Ouro
// Se XP for entre 7.001 e 8.000 = Platina
// Se XP for entre 8.001 e 9.000 = Ascendente
// Se XP for entre 9.001 e 10.000= Imortal
// Se XP for maior ou igual a 10.001 = Radiante

    const hero = ['Link', 1000]
    heroName = hero[0]
    xp = hero[1]

    let level;
    if (xp < 1000) {
        level = 'Ferro';
    } else if (xp < 2000) {
        level = 'Bronze';
    } else if (xp < 5000) {
        level = 'Prata';
    } else if (xp < 7000) {
        level = 'Ouro';
    } else if (xp < 8000) {
        level = 'Platina';
    } else if (xp < 9000) {
        level = 'Ascendente';
    } else if (xp < 10000) {
        level = 'Imortal';
    } else {
        level = 'Radiante';
    }
    console.log(level)