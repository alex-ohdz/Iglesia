const bcrypt = require('bcryptjs');

const password = 'admin';

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Contraseña Hasheada:', hashedPassword);
  } catch (error) {
    console.error('Error generando el hash:', error);
  }
};

generateHash(password);


//   ,
// 	"welcome": "Welcome to Our Community",
// 	"image_description": "Image Description",
// 	"description": "The Church of San Juan Bautista de Remedios located in San Juan de los Remedios, Villa Clara is considered the oldest church in Cuba. The current church was built in 1692 on the existing structure of a church that was originally built in 1570. The bell tower is a neoclassical design and the interior is baroque. Some of the most important features are the ornate ceiling, the gold leaf, and the cedar altar all carved in wood and laminated in gold by a Remedios artisan of Asian descent Rogelio Attá and places baroque altarpieces and pictorial collection in both naves of the church. It is today the only baroque church interior and exteriorly in Cuba being permanently visited by national and international tourism who come to appreciate its preserved patrimonial assets.",
// 	"recent_activities": "Recent Activities"

// ,
// 	"welcome": "Bienvenidos a Nuestra Comunidad",
// 	"image_description": "Descripción de la imagen",
// 	"description": "La Iglesia de San Juan Bautista de Remedios ubicada en San Juan de los Remedios, Villa Clara se le atribuye ser la iglesia más antigua de Cuba. La iglesia actual fue construida en 1692 sobre la estructura existente de una iglesia que fue construida originalmente en 1570. La torre-campanario es un diseño neoclásico y el interior es barroco. Algunas de las características más importantes son el techo ornamentado, el pan de oro y el altar de cedro cubierto todo tallado en madera y laminado en oro realizado por un artesano remediano de descendencia asiática Rogelio Attá y coloca retablos barrocos y colección pictórica en ambas naves de la iglesia. Es hoy la única iglesia barroca interior y exteriormente en Cuba siendo visitada permanentemente por turismo nacional e internacional que acuden a apreciar sus bienes conservados patrimoniales.",
// 	"recent_activities": "Actividades Recientes"

// ,
// 	"welcome": "Witamy w naszej społeczności",
// 	"image_description": "Opis obrazu",
// 	"description": "Kościół San Juan Bautista de Remedios położony w San Juan de los Remedios, Villa Clara uważany jest za najstarszy kościół na Kubie. Obecny kościół został zbudowany w 1692 roku na istniejącej strukturze kościoła, który został pierwotnie zbudowany w 1570 roku. Wieża-dzwonnica ma neoklasyczny styl, a wnętrze jest barokowe. Niektóre z najważniejszych cech to ozdobny sufit, złote liście i ołtarz z cedru, wszystkie rzeźbione w drewnie i pokryte złotem przez rzemieślnika z Remedios pochodzenia azjatyckiego Rogelio Attá, który umieszcza barokowe ołtarze i kolekcję obrazów w obu nawach kościoła. Jest to dzisiaj jedyny barokowy kościół wewnętrznie i zewnętrznie na Kubie, który jest stale odwiedzany przez krajowych i międzynarodowych turystów, którzy przyjeżdżają, aby docenić jego zachowane zabytkowe dobra.",
// 	"recent_activities": "Najnowsze Działania"