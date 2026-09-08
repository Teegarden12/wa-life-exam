// ============================================================================
// PSI CONTENT AREAS — from the official examination content outline
// (proctor2.psionline.com/programs/WAINS/lif26.pdf):
//   "WASHINGTON LIFE PRODUCER — 100 Items · 150 Minutes", 70% to pass.
//
// `items`  = how many of the 100 exam questions come from that area.
// `base`   = what Aubrey scored in that area on the real exam, 08/17/2026
//            (total 53/100). Used to show where the recoverable points are.
//
// AREA_MAP tags the original 300 questions, which predate this structure.
// Questions added later carry their own `area` field and are not listed here.
// ============================================================================

var AREAS = [
  { key:"WA", name:"Washington Laws, Rules & Regulations", short:"WA Laws", items:30, base:17 },
  { key:"Provisions", name:"Life Insurance Policy Provisions, Options & Riders", short:"Provisions", items:20, base:6 },
  { key:"Types", name:"Types of Life Insurance Policies", short:"Policy Types", items:14, base:11 },
  { key:"Basics", name:"Life Insurance Basics", short:"Basics", items:13, base:9 },
  { key:"Concepts", name:"General Insurance Concepts", short:"Concepts", items:9, base:3 },
  { key:"Annuities", name:"Annuities", short:"Annuities", items:8, base:6 },
  { key:"Tax", name:"Federal Tax Considerations for Life Insurance", short:"Fed Tax", items:4, base:1 },
  { key:"Federal", name:"Federal Laws and Regulations", short:"Fed Laws", items:2, base:0 },
];

var AREA_MAP = {"1":"Types","2":"Types","3":"Types","4":"Types","5":"Types","6":"Types","7":"Types","8":"Types","9":"Types","10":"Types","11":"Types","12":"Types","13":"Types","14":"Types","15":"Types","16":"Basics","17":"Basics","18":"Types","19":"Types","20":"Types","21":"Types","22":"Types","23":"Types","24":"Types","25":"Types","26":"Types","27":"Types","28":"Basics","29":"Types","30":"Types","31":"Types","32":"Types","33":"Types","34":"Types","35":"Types","36":"Basics","37":"Types","38":"Types","39":"Types","40":"Types","41":"Provisions","42":"Provisions","43":"Provisions","44":"Provisions","45":"Provisions","46":"Provisions","47":"Provisions","48":"Provisions","49":"Provisions","50":"Provisions","51":"Provisions","52":"Provisions","53":"Provisions","54":"Types","55":"Provisions","56":"Provisions","57":"Provisions","58":"Provisions","59":"Provisions","60":"Provisions","61":"Provisions","62":"Provisions","63":"Provisions","64":"Provisions","65":"Provisions","66":"Provisions","67":"Provisions","68":"Provisions","69":"Provisions","70":"Provisions","71":"Provisions","72":"Provisions","73":"Provisions","74":"Provisions","75":"Provisions","76":"Provisions","77":"Provisions","78":"Provisions","79":"Provisions","80":"Provisions","81":"Provisions","82":"Provisions","83":"Provisions","84":"Provisions","85":"Types","86":"Provisions","87":"Provisions","88":"Provisions","89":"Provisions","90":"Types","91":"Provisions","92":"Provisions","93":"Provisions","94":"Basics","95":"Provisions","96":"Annuities","97":"Annuities","98":"Annuities","99":"Annuities","100":"Annuities","101":"Annuities","102":"Annuities","103":"Annuities","104":"Annuities","105":"Annuities","106":"Annuities","107":"Annuities","108":"Annuities","109":"Annuities","110":"Annuities","111":"Annuities","112":"Tax","113":"Annuities","114":"Annuities","115":"Annuities","116":"Annuities","117":"Annuities","118":"Annuities","119":"Tax","120":"Annuities","121":"Annuities","122":"Annuities","123":"Annuities","124":"Annuities","125":"Tax","126":"Annuities","127":"Annuities","128":"Annuities","129":"Annuities","130":"Annuities","131":"Basics","132":"Basics","133":"Basics","134":"Basics","135":"Basics","136":"Provisions","137":"Basics","138":"Basics","139":"Concepts","140":"Basics","141":"Basics","142":"Basics","143":"Provisions","144":"Basics","145":"Basics","146":"Basics","147":"Basics","148":"Basics","149":"Basics","150":"Basics","151":"Provisions","152":"Basics","153":"Concepts","154":"Basics","155":"Basics","156":"Provisions","157":"Basics","158":"WA","159":"Concepts","160":"Basics","161":"Provisions","162":"Basics","163":"Basics","164":"Basics","165":"Basics","166":"Tax","167":"Tax","168":"Tax","169":"Tax","170":"Tax","171":"Tax","172":"Tax","173":"Tax","174":"Tax","175":"Tax","176":"Tax","177":"Tax","178":"Tax","179":"Tax","180":"Tax","181":"Tax","182":"Tax","183":"Tax","184":"Provisions","185":"Tax","186":"Tax","187":"Tax","188":"Tax","189":"Tax","190":"Tax","191":"Tax","192":"Tax","193":"Tax","194":"Tax","195":"Tax","196":"Tax","197":"Tax","198":"Tax","199":"Tax","200":"Tax","201":"WA","202":"WA","203":"WA","204":"WA","205":"WA","206":"WA","207":"WA","208":"WA","209":"WA","210":"Concepts","211":"WA","212":"Concepts","213":"Basics","214":"WA","215":"WA","216":"WA","217":"WA","218":"WA","219":"WA","220":"WA","221":"WA","222":"WA","223":"Concepts","224":"Concepts","225":"WA","226":"WA","227":"WA","228":"WA","229":"WA","230":"WA","231":"WA","232":"WA","233":"WA","234":"WA","235":"WA","236":"WA","237":"WA","238":"WA","239":"WA","240":"WA","241":"WA","242":"Annuities","243":"WA","244":"Provisions","245":"WA","246":"WA","247":"WA","248":"WA","249":"Concepts","250":"WA","251":"WA","252":"Provisions","253":"WA","254":"WA","255":"WA","256":"WA","257":"WA","258":"WA","259":"WA","260":"Concepts","261":"WA","262":"WA","263":"WA","264":"WA","265":"WA","266":"WA","267":"WA","268":"WA","269":"WA","270":"Provisions","271":"WA","272":"WA","273":"WA","274":"WA","275":"WA","276":"WA","277":"WA","278":"WA","279":"WA","280":"WA","281":"WA","282":"WA","283":"WA","284":"WA","285":"WA","286":"WA","287":"WA","288":"Types","289":"WA","290":"WA","291":"WA","292":"WA","293":"WA","294":"WA","295":"WA","296":"WA","297":"WA","298":"WA","299":"WA","300":"WA"};

// Apply the map to any question that does not already declare an area.
(function applyAreas(){
  if (typeof QUESTIONS === 'undefined') return;
  QUESTIONS.forEach(function(q){ if (!q.area) q.area = AREA_MAP[q.id] || 'Basics'; });
})();

if (typeof window !== 'undefined') { window.AREAS = AREAS; window.AREA_MAP = AREA_MAP; }
