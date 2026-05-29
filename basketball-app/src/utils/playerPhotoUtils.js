// utils/playerPhotoUtils.js

export const getBasketballReferenceId = (firstName, lastName) => {
  const cleanedFirstName = firstName === 'T.J.' || firstName === 'A.J.' ? firstName.replace(".", "") : firstName === 'Vít' ? firstName.replace("í", "i") : firstName === "D'Angelo" || firstName === "N'Faly" ? firstName.replace("'", "") : firstName;
  const cleanedLastName = lastName === 'Đurišić' ? lastName.split("")[0].replace("Đ", "D") + "j" + lastName.slice(1) : lastName === "O'Neale" ? lastName.replace("'", "") : lastName
    .normalize("NFD")                 // split accented letters into base + diacritic
    .replace(/[\u0300-\u036f]/g, ""); // remove diacritic marks
  let count = 0;
  const newName = cleanedLastName.replace(/e/g, (match) => {
    count++;
    return count === 2 ? "i" : match;
  });
  const finalName = newName.slice(0, -1).toLowerCase();
  if (!firstName || !lastName) return null;

  const last = cleanedLastName.trim().toLowerCase().slice(0, 5);

  const last2 = cleanedLastName.trim().toLowerCase().slice(0, 2);

  const normalizeFirstName = (firstName) =>
    firstName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.'’\s-]/g, '')
      .toLowerCase();

  const FIRST_PART_OVERRIDES = {
    'bub carrington': 'ca',   // if you really need this override
    "n'faly dante": 'nf',
    'e.j. liddell': 'ej',
    'p.j. washington': 'pj',
  };
  const getFirstName = (firstName, lastName) => {
    const fullKey = `${(firstName || '').toLowerCase()} ${(lastName || '').toLowerCase()}`.trim();
    if (FIRST_PART_OVERRIDES[fullKey]) return FIRST_PART_OVERRIDES[fullKey];
    const normalized = normalizeFirstName(firstName === 'Bub Carrington' ? firstName.split(" ")[1] : firstName || '');
    return normalized.slice(0, 2);
  };

  const first = getFirstName(firstName, lastName);

  const replaceWithNewLetter = first[first.length - 1] === 'l' ? first.slice(0, -1) + 'j' : first
  const lastNamePart1 = lastName.split(" ").length > 1 && cleanedLastName.split(" ")[0].trim().toLowerCase().slice(0, 5);
  const lastNamePart2 = lastName.split(" ").length > 1 && cleanedLastName.split(" ")[1].trim().toLowerCase().slice(0, 3);
  const lastNameLengthGreaterThanOne = lastName === 'da Silva' && lastNamePart1 + lastNamePart2
  const firstNameGreaterThanOne = firstName.split(" ")[1]?.toLowerCase()
  const fullFirstName = firstName === 'Yang' && firstName.trim().toLowerCase();



  return `${firstName === 'Yang' ? fullFirstName : cleanedLastName === 'Niederhauser' ? firstNameGreaterThanOne : cleanedLastName === 'Đjurišić' ? last : cleanedFirstName === 'NFaly' || 'Nikola' && cleanedLastName === 'Đjurišić' ? first : cleanedLastName === 'Kleber' ? finalName : lastName === 'da Silva' ? lastNameLengthGreaterThanOne : last}${cleanedFirstName === 'Clint' && cleanedLastName === 'Capela' || cleanedLastName === 'Dante' || cleanedLastName === 'Hansen' ? last2 : cleanedFirstName === 'Elijah' && cleanedLastName === 'Harkless' ? replaceWithNewLetter : first}${firstName === 'Jalen' && lastName === 'Johnson' || firstName === 'Tolu' && lastName === 'Smith' || firstName === 'Jabari' && lastName === 'Smith Jr.' || firstName === 'Jahmir' && lastName === 'Young' || firstName === 'Jalen' && lastName === 'Green' ? '05' : firstName === 'Ziaire' && lastName === 'Williams' || firstName === 'Cam' && lastName === 'Thomas' || firstName === 'Jaylen' && lastName === 'Brown' || firstName === 'Miles' && lastName === 'Bridges' || firstName === 'Josh' && lastName === 'Green' || firstName === 'Brandon' && lastName === 'Miller' || firstName === 'Larry' && lastName === 'Nance Jr.' || firstName === 'Max' && lastName === 'Christie' || firstName === 'Jaden' && lastName === 'Hardy' || firstName === 'Anthony' && lastName === 'Davis' || firstName === 'Caleb' && lastName === 'Martin' || firstName === 'Tim' && lastName === 'Hardaway Jr.' || firstName === 'Kessler' && lastName === 'Edwards' || firstName === 'Cameron' && lastName === 'Johnson' || firstName === 'Jalen' && lastName === 'Pickett' || firstName === 'Javonte' && lastName === 'Green' || firstName === 'Brice' && lastName === 'Williams' || firstName === 'Colby' && lastName === 'Jones' || firstName === 'Tobias' && lastName === 'Harris' || firstName === 'Trayce' && lastName === 'Jackson-Davis' || firstName === 'Jeff' && lastName === 'Green' || firstName === 'Jarace' && lastName === 'Walker' || firstName === 'Jordan' && lastName === 'Miller' || firstName === 'Derrick' && lastName === 'Jones Jr.' || firstName === 'Cam' && lastName === 'Christie' || firstName === 'TyTy' && lastName === 'Washington Jr.' || firstName === 'Bronny' && lastName === 'James Jr.' || firstName === 'Jaxson' && lastName === 'Hayes' || firstName === 'Scotty' && lastName === 'Pippen Jr.' || firstName === 'Jaren' && lastName === 'Jackson Jr.' || firstName === 'Gary' && lastName === 'Trent Jr.' || firstName === 'Kevin' && lastName === 'Porter Jr.' || firstName === 'Taurean' && lastName === 'Prince' || firstName === 'Tyler' && lastName === 'Smith' || firstName === 'Jaden' && lastName === 'McDaniels' || firstName === 'Jaylen' && lastName === 'Clark' || firstName === 'Trey' && lastName === 'Murphy III' || firstName === 'Jase' && lastName === 'Richardson' || firstName === 'Marcus' && lastName === 'Bagley' || firstName === 'Jared' && lastName === 'Butler' || firstName === 'Andrew' && lastName === 'Carr' || firstName === 'Julian' && lastName === 'Champagnie' || firstName === 'Harrison' && lastName === 'Barnes' || firstName === 'Terence' && lastName === 'Davis' || firstName === 'Keegan' && lastName === 'Murray' || firstName === 'Devin' && lastName === 'Carter' || firstName === 'Ron' && lastName === 'Harper Jr.' || firstName === 'Miles' && lastName === 'Kelly' || firstName === 'Gary' && lastName === 'Payton II' || firstName === 'Will' && lastName === 'Richard' || firstName === 'Malachi' && lastName === 'Smith' ? '02' : firstName === 'Jalen' && lastName === 'Wilson' || firstName === 'Brandon' && lastName === 'Williams' || firstName === 'Coleman' && lastName === 'Hawkins' || firstName === 'Tre' && lastName === 'Johnson' || firstName === 'Kam' && lastName === 'Jones' ? '03' : firstName === 'Keon' && lastName === 'Johnson' || firstName === 'Jaylin' && lastName === 'Williams' || firstName === 'Mark' && lastName === 'Williams' ? '07' : firstName === 'Jalen' && lastName === 'Smith' || firstName === 'Kenrich' && lastName === 'Williams' || firstName === 'Robert' && lastName === 'Williams III' || firstName === 'Keldon' && lastName === 'Johnson' || firstName === 'Cody' && lastName === 'Williams' || firstName === 'Kenyon' && lastName === 'Martin Jr.' ? '04' : firstName === 'Marcus' && lastName === 'Williams' || firstName === 'Jalen' && lastName === 'Williams' || firstName === 'David' && lastName === 'Jones-Garcia' || firstName === 'Chaney' && lastName === 'Johnson' ? '06' : firstName === 'Keshad' && lastName === 'Johnson' ? '10' : '01'}`;
}

export const getBBRefPhotoUrl = (cleanedFirstName, cleanedLastName) => {

  const playerId = getBasketballReferenceId(cleanedFirstName, cleanedLastName);
  return `https://www.basketball-reference.com/req/202106291/images/headshots/${playerId}.jpg`;
};
