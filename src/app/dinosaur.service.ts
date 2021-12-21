import { Injectable } from '@angular/core';
import { Dinosaur } from './dinosaur';

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {
  constructor() { }

  public dinosaurs: Dinosaur[] = [{
    name: 'Allosaurus',
    synopsis: 'The bite of Allosaurus wasn\'t very strong and instead, it is theorized to have used its upper jaw like a hatchet to exsanguinate its prey, although the possibility of this hunting technique is still debated. It is also believed that Allosaurus also used its muscular, clawed arms to grapple onto its prey.',
    diet: 'Carnivore'
  }, {
    name: 'Ankylosaurus',
    synopsis: 'Recognizable by the large club at the end of its tail, Ankylosaurus is usually seen as the archetypical ankylosaur, but it had plenty of features unique to itself: It was a massive animal, far larger than any nodosaurid and even the average ankylosaurid. Its armor, like that of other ankylosaurids, was plate-like and lightweight, rather than the spiky, heavyweight defenses nodosaurids displayed. Its massive tail club was similar to that of Euoplocephalus, yet with slightly different proportions.',
    diet: 'Herbivore'
  }, {
    name: 'Apatosaurus',
    synopsis: 'Apatosaurus is one of the most well known and popular sauropods along with Diplodocus, Brachiosaurus, and Camarasaurus. Compared to its closest relatives in the Morrison Formation, Diplodocus and Barosaurus, Apatosaurus was stockier and shorter overall.[4] The long tail ended with a whip-like tip which could have been used for visual communication with other Apatosaurus and as a weapon against predators.[5] The long neck of Apatosaurus and other sauropods allowed them to feed from trees or on ground level.',
    diet: 'Herbivore'
  }, {
    name: 'Brachiosaurus',
    synopsis: 'One of the world\'s most popular dinosaurs, Brachiosaurus once roamed North America during the Late Jurassic and is one of the rarer sauropods from this area. Brachiosaurus and its family have two notable features that distinguish them from other sauropods; their front legs are proportionally longer than their rear legs and their neck is held upright. This allowed Brachiosaurus to reach high into the tree-tops and avoid competition with ground-dwelling herbivores.',
    diet: 'Herbivore'
  }, {
    name: 'Carnotaurus',
    synopsis: 'Carnotaurus is known from a single, yet almost nearly complete skeleton and several skin impressions, with only the tail and lower legs missing. However, from this one skeleton, much has been learned from this unique carnivore. Carnotaurus was built for speed, with long, powerful legs and a streamlined body, hence the tiny minuscule arms and wedge-shaped head. The bite of Carnotaurus seems to have been relatively weak, as the lower jaw isn\'t as powerfully built as other theropods, this suggests that Carnotaurus was more adapted to chasing down smaller prey.',
    diet: 'Carnivore'
  }, {
    name: 'Compsognathus',
    synopsis: 'This lithe turkey-sized predator is the namesake of the Compsognathidae family, a group of small, primitive coelurosaurs that lived in Europe, Asia and perhaps South America from the Late Jurassic to the Early Cretaceous. In 1863, Compsognathus was the first dinosaur ever linked to birds, due to its resemblance to then newly discovered Archaeopteryx. Yet said proposal fell into obscurity for over a century, until John Ostrom, in the wake of the discovery of Deinonychus, redescribed the animal based on the French specimen.',
    diet: 'Omnivore'
  }, {
    name: 'Dimorphodon',
    synopsis: 'Dimorphodon was a mid-sized pterosaur from the Early Jurassic of Europe. It was a specialized pterosaur with a large skull, short wings, and large claws. Like other non-pterodactyloid pterosaurs it had a long tail, which may have had a triangular vane on the end.',
    diet: 'Piscivore'
  }, {
    name: 'Iguanodon',
    synopsis: 'Iguanodon was the second dinosaur ever discovered and named in modern times, the first being Megalosaurus which had been classified the previous year. The first specimen was found in England and named for its teeth, which resembled those of an iguana lizard. Subsequent fossils have been unearthed in France, Spain, Germany and especially Belgium. However, as with many Victorian discoveries, it has become a wastebasket taxon, with almost any new ornithopod found being named as an Iguanodon. Asian and North American species of Iguanodon have been reassigned to new genus. Many European species have also been reassigned, such as Mantellisaurus, which has been shown to be more closely related to Ouranosaurus after further study.',
    diet: 'Herbivore'
  }, {
    name: 'Mosasaurus',
    synopsis: 'The largest member of its family, the Mosasaurus is one of the largest marine reptiles, growing up to 17 meters in length, and lived in the Late Cretaceous period from 82 to 65 million years ago in the Atlantic Ocean. The Mosasaurus greatly resembles the Tylosaurus, but had a more robust physique.',
    diet: 'Piscivore'
  }, {
    name: 'Parasaurolophus',
    synopsis: 'Parasaurolophus was discovered in 1920 by a group from the University of Toronto in Alberta, Canada. The name Parasaurolophus means \'Near Crested Lizard\', as early paleontologists originally believed this dinosaur was a direct relative of a genus called Saurolophus, though this is no longer accepted.',
    diet: 'Herbivore'
  }, {
    name: 'Pteranodon',
    synopsis: 'Pteranodon was first found by Othniel Charles Marsh in 1870, in the Late Cretaceous Smoky Hill Chalk deposits of western Kansas. The first pterosaur discovered outside of Europe, it was originally deemed a species of the much smaller and earlier Pterodactylus, but that changed when its skull was discovered, and thus its lack of teeth lend it its name. Since then, hundreds of specimens have been found, from all stages of development.',
    diet: 'Piscivore' 
  }, {
    name: 'Velociraptor',
    synopsis: 'Velociraptor lived around 75-71 million years ago in Mongolia, the first specimen of which was discovered in 1923 by Peter Kaisen in the Gobi Desert, Mongolia. It is now known from over a dozen fossils, the most famous of which is one locked in combat with a Protoceratops. The general scientific consensus is that Velociraptor had feathers, as fossils of some of the specimens\' forearms show bumps that appear to be quill knobs.',
    diet: 'Carnivore'
  }, {
    name: 'Stegosaurus',
    synopsis: 'One of the world\'s best-known dinosaurs, Stegosaurus was first found in 1877 by the famous paleontologist, Othniel Charles Marsh in the Morrison Formation. Famous for the large plates on its back and the lethal spikes on its tail, the name Stegosaurus means \'Roof Lizard\', as Marsh first theorized that the plates lay across the dinosaur\'s back as a sort of armor. It was only after several complete skeletons were found that the plates were correctly reconstructed. The plates of Stegosaurus and other North American stegosaurs such as Hesperosaurus are arranged in staggered alternating pairs, which are different than the stegosaurs with straight pairs of plates such as Kentrosaurus and Chungkingosaurus.',
    diet: 'Herbivore'
  }, {
    name: 'Tyrannosaurus',
    synopsis: 'Tyrannosaurus had a bite force of almost 6,000 kg of pressure, giving it arguably the strongest jaws ever seen amongst terrestrial carnivores with only extremely large crocodilians (i.e. Deinosuchus) and marine predators, such as the Mosasaurus and the Megalodon, have rivaled or surpassed it in sheer bite force. Large individuals could reach lengths of 43 feet and grow to 13 feet tall, with the average still being a respectably huge 40 feet long and 12 feet tall. Its teeth are actually blunt and relied more on the bite force than a serrated edge like other theropods. This was an adaptation to crush bones and bite through body armor, allowing adult Tyrannosaurus to both bring down armored prey such as ankylosaurids and ceratopsians, as well as process a carcass efficiently by crunching bones and tougher tissues to eat.',
    diet: 'Carnivore'
  }, {
    name: 'Triceratops',
    synopsis: 'Discovered in 1889, Triceratops is thus far the largest ceratopsian discovered and among the world\'s most famous dinosaurs. A member of the Chasmosaurinae branch of ceratopsians, there are two known species in the Triceratops genus: Triceratops prorsus and the holotype Triceratops horridus. Recently, there has been speculation that Torosaurus, a rarer ceratopsian that coexisted with Triceratops, may have been a more mature form of Triceratops, however, this is still under debate. A second species named Nedoceratops, known from only fragmentary remains, is also theorized to be an immature Triceratops.',
    diet: 'Herbivore'
  }, {
    name: 'Sinoceratops',
    synopsis: 'Sinoceratops belongs to the Centrosaurinae branch of ceratopsids, which contained other species such as Styracosaurus, and was one of the largest of the group. Its discovery is significant, as it is the only known ceratopsid that lived outside of North America.',
    diet: 'Herbivore'
  }]
}
