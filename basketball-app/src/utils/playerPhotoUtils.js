const suffix2 = new Set([
  'Malachi Smith', 'Will Richard', 'Gary Payton II', 'Miles Kelly', 'Ron Harper Jr.', 'Devin Carter',
  'Keegan Murray', 'Terence Davis', 'Harrison Barnes', 'Julian Champagnie', 'Andrew Carr', 'Jared Butler',
  'Marcus Bagley', 'Jase Richardson', 'Trey Murphy III', 'Jaylen Clark', 'Jaden McDaniels', 'Tyler Smith',
  'Taurean Prince', 'Kevin Porter Jr.', 'Gary Trent Jr.', 'Jaren Jackson Jr.', 'Scotty Pippen Jr.', 'Jaxson Hayes',
  'Bronny James Jr.', 'TyTy Washington Jr.', 'Cam Christie', 'Derrick Jones Jr.', 'Jordan Miller', 'Jarace Walker',
  'Jeff Green', 'Trayce Jackson-Davis', 'Tobias Harris', 'Colby Jones', 'Brice Williams', 'Javonte Green', 'Jalen Pickett',
  'Cameron Johnson', 'Kessler Edwards', 'Tim Hardaway Jr.', 'Caleb Martin', 'Anthony Davis', 'Jaden Hardy', 'Max Christie',
  'Larry Nance Jr.', 'Brandon Miller', 'Josh Green', 'Miles Bridges', 'Jaylen Brown', 'Cam Thomas', 'Ziaire Williams'
])
const suffix3 = new Set([
  'Kam Jones', 'Tre Johnson', 'Coleman Hawkins', 'Brandon Williams', 'Jalen Wilson'])
const suffix4 = new Set(['Kenyon Martin Jr.', 'Cody Williams', 'Keldon Johnson', 'Robert Williams III', 'Kenrich Williams', 'Jalen Smith'])
const suffix5 = new Set(['Jalen Green', 'Jahmir Young', 'Jabari Smith Jr.', 'Jalen Johnson', 'Tolu Smith'])
const suffix6 = new Set(['Marcus Williams', 'Jalen Williams', 'David Jones-Garcia', 'Chaney Johnson'])
const suffix7 = new Set(['Mark Williams', 'Jaylin Williams', 'Keon Johnson'])
const suffix10 = new Set(['Keshad Johnson'])

const getPlayerSuffix = (firstName, lastName) => {
  const fullName = `${firstName} ${lastName}`

  if (suffix2.has(fullName)) return '02'
  if (suffix3.has(fullName)) return '03'
  if (suffix4.has(fullName)) return '04'
  if (suffix5.has(fullName)) return '05'
  if (suffix6.has(fullName)) return '06'
  if (suffix7.has(fullName)) return '07'
  if (suffix10.has(fullName)) return '10'

  return '01'
}


const normalizeFirstName = (firstName) =>
  firstName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.'’\s-]/g, '')
    .toLowerCase();

const FIRST_PART_OVERRIDES = {
  'bub carrington': 'ca',
  "n'faly dante": 'nf',
  'e.j. liddell': 'ej',
  'p.j. washington': 'pj',
};

const cleanFirstName = (firstName) => {
  if (firstName === 'T.J.' || firstName === 'A.J.') {
    return firstName.replace(".", "")
  }
  if (firstName === 'Vít') {
    return firstName.replace("í", "i")
  }
  if (firstName === "D'Angelo" || firstName === "N'Faly") {
    return firstName.replace("'", "")
  }
  return firstName
}

const cleanLastName = (lastName) => {
  let cleaned = lastName
  if (lastName === 'Đurišić') {
    cleaned = lastName.split("")[0].replace("Đ", "D") + "j" + lastName.slice(1)
  }
  if (lastName === "O'Neale") {
    cleaned = lastName.replace("'", "")
  }
  return cleaned
    .normalize("NFD")                 // split accented letters into base + diacritic
    .replace(/[\u0300-\u036f]/g, "") // remove diacritic marks
}

const getFirstName = (firstName, lastName) => {
  const fullKey = `${(firstName || '').toLowerCase()} ${(lastName || '').toLowerCase()}`.trim();
  if (FIRST_PART_OVERRIDES[fullKey]) return FIRST_PART_OVERRIDES[fullKey];
  const normalized = normalizeFirstName(firstName === 'Bub Carrington' ? firstName.split(" ")[1] : firstName || '');
  return normalized.slice(0, 2);
};

const getFirstNamePart = (cleanedLastName, cleanedFirstName, last2, replaceWithNewLetter, first) => {
  if ((cleanedFirstName === 'Clint' && cleanedLastName === 'Capela') ||
    cleanedLastName === 'Dante' ||
    cleanedLastName === 'Hansen') {
    return last2
  }
  if (cleanedFirstName === 'Elijah' && cleanedLastName === 'Harkless') {
    return replaceWithNewLetter
  }
  return first
}

export const getBasketballReferenceId = (firstName, lastName) => {
  if (!firstName || !lastName) return null;
  const cleanedFirstName = cleanFirstName(firstName)
  const cleanedLastName = cleanLastName(lastName)

  let count = 0
  const newName = cleanedLastName.replace(/e/g, (match) => {
    count++;
    return count === 2 ? "i" : match;
  });
  const finalName = newName.slice(0, -1).toLowerCase();

  const last = cleanedLastName.trim().toLowerCase().slice(0, 5);

  const last2 = cleanedLastName.trim().toLowerCase().slice(0, 2);


  const first = getFirstName(firstName, lastName);

  const replaceWithNewLetter = first[first.length - 1] === 'l' ? first.slice(0, -1) + 'j' : first
  const lastNamePart1 = lastName.split(" ").length > 1 && cleanedLastName.split(" ")[0].trim().toLowerCase().slice(0, 5);
  const lastNamePart2 = lastName.split(" ").length > 1 && cleanedLastName.split(" ")[1].trim().toLowerCase().slice(0, 3);
  const lastNameLengthGreaterThanOne = lastName === 'da Silva' && lastNamePart1 + lastNamePart2
  const firstNameGreaterThanOne = firstName.split(" ")[1]?.toLowerCase()
  const fullFirstName = firstName === 'Yang' && firstName.trim().toLowerCase();

  const lastNamePart =
    firstName === 'Yang'
      ? fullFirstName
      : cleanedLastName === 'Niederhauser'
        ? firstNameGreaterThanOne
        : cleanedLastName === 'Djurisic'
          ? last
          : ((cleanedFirstName === 'NFaly' || cleanedFirstName === 'Nikola') &&
            cleanedLastName === 'Djurisic')
            ? first
            : cleanedLastName === 'Kleber'
              ? finalName
              : lastName === 'da Silva'
                ? lastNameLengthGreaterThanOne
                : last;

  const suffix = getPlayerSuffix(firstName, lastName);

  const firstNamePart = getFirstNamePart(cleanedLastName, cleanedFirstName, last2, replaceWithNewLetter, first)

  return `${lastNamePart}${firstNamePart}${suffix}`
}

export const getBBRefPhotoUrl = (cleanedFirstName, cleanedLastName) => {

  const playerId = getBasketballReferenceId(cleanedFirstName, cleanedLastName);
  return `https://www.basketball-reference.com/req/202106291/images/headshots/${playerId}.jpg`;
};
