import { data } from './bki-data2.js'

const inputs = [
  {
    id: 'aquaponics',
    origValue: 0,
    maxValue: 4,
    title: `Local urban food production`,
    description: `Aquaponics — Food is produced locally in Hamburg in containers.`,
    author: 'human',
    tags: ['mitigation']
  },
  /*
  {
    origValue: 0,
    title: `cycling lanes made out of solar panels`,
    description: `use the cycling lanes for electricity production`,
    tags: ['mitigation']
  },
  */
  {
    id: 'emission_fees',
    origValue: 0,
    maxValue: 2,
    title: `Emission fees`,
    description: `Social Urban Emission Trading System (SUETS) — Districts would collect fees from their citizens for the amount of CO2 that they consume through actions like fuel car driving, traveling by plane, eating things from far away...`,
    author: 'human',
    tags: ['mitigation']
  },
  {
    id: 'auto_free_city',
    origValue: 0,
    maxValue: 1,
    title: `Auto free city`,
    description: `TODO`,
    author: 'human',
    tags: ['mitigation']
  },
  {
    id: 'amphibic_houses',
    origValue: 0,
    maxValue: 4,
    title: `Amphibic houses`,
    description: `If the water level rises¸ they can move upwards and float.`,
    author: 'human',
    tags: ['adaptation']
  },
  {
    id: 'green_roofs',
    origValue: 0,
    maxValue: 4,
    title: `Green roofs`,
    description: `Green roofs are rooftops planted with vegetation. Intensive green roofs have thick layers of soil (6 to 12 inches or more) that can support a broad variety of plant or even tree species. Extensive roofs are simpler green roofs with a soil layer of 6 inches or less to support turf¸ grass¸ or other ground cover`,
    author: 'human',
    tags: ['adaptation']
  },
  /*
  {
    origValue: 0,
    title: `neo-marxist`,
    description: `Democratic control of the means of production: We need a democratization of the economy, ensuring that decision-making power over production processes is vested in the hands of workers and communities. This will enable a shift away from profit-driven, environmentally destructive practices towards sustainable and socially just modes of production.`,
    tags: ['systemic']
  },
  */
  {
    id: 'collectivization_of_production_goods',
    origValue: 0,
    maxValue: 1,
    title: `Collectivization of production goods`,
    description: `Ensuring that decision-making power over production processes is vested in the hands of workers and communities. This will enable a shift away from profit-driven, environmentally destructive practices towards sustainable and socially just modes of production. ADD: Local production`,
    author: 'ai',
    tags: ['systemic']
  },
  /*
  {
    origValue: 0,
    title: `Eco-feminist`,
    description: `The transition to a life-centered economy that prioritizes the well-being of communities and ecosystems over corporate profits. This involves valuing care work, promoting local and regenerative economies, and challenging consumerism and the commodification of nature. Industrial agriculture, controlled by agribusiness corporations, contributes significantly to greenhouse gas emissions, deforestation, and the erosion of biodiversity. Promoting agroecological practices that prioritize local, diverse, and organic food production not only mitigates climate change but also empowers farmers, particularly women, and promotes food security and resilience.`,
    tags: ['systemic']
  },
  */
  {
    id: 'queer_feminist_ai',
    origValue: 0,
    maxValue: 1,
    title: `Queer-feminist inclusion`,
    description: `Center the voices and experiences of marginalized communities, including queer individuals, women, people of color, and indigenous communities.`,
    author: 'ai',
    tags: ['systemic']
  },
  /* 2
  {
    hidden: true,
    origValue: 0,
    title: `Climate Justice`,
    description: `a set of actions: no fossil fuels, energy efficiency measures, accountability for perpetuating the crisis, restore and protect ecosystems, reforestation, regenerative agriculture, protection of biodiversity hotspots, participatory democracy`,
    tags: ['systemic']
  },
  */
  {
    id: 'accountability_for_perpetuating_the_crisis',
    origValue: 0,
    maxValue: 2,
    title: `Accountability for perpetuating the crisis`,
    description: `Punish people, companies and parties who have a big responsibility for the climate crisis.`,
    author: 'ai',
    tags: ['systemic']
  },
  {
    id: 'circular_economy',
    origValue: 0,
    maxValue: 3,
    title: `Circular economy initiatives`,
    description: `Foster a shift towards a circular economy model where resources are used efficiently, waste is minimized, and materials are continuously recycled or repurposed. Encourage local production, repair and sharing initiatives, and reduce reliance on single-use products.`,
    author: 'ai',
    tags: ['systemic']
  },
  {
    id: 'public_awareness_and_education',
    origValue: 0,
    maxValue: 2,
    title: `Public awareness and education`,
    description: `Invest in public awareness campaigns and education programs to foster a culture of sustainability. Promote environmental literacy, encourage behavior change towards sustainable practices, and engage citizens in decision-making processes to ensure their active participation in creating sustainable cities.`,
    author: 'ai',
    tags: ['systemic']
  },
  {
    id: 'collaborative_governance',
    origValue: 0,
    maxValue: 2,
    title: `Collaborative governance`,
    description: `Foster collaboration and partnerships between various stakeholders, including government bodies, businesses, communities, and non-profit organizations. Create political models based on participatory decision-making processes, co-creation of solutions, and inclusive governance models to address climate challenges collectively.`,
    author: 'ai',
    tags: ['systemic']
  },
  {
    id: 'interspecies_ai',
    origValue: 0,
    maxValue: 1,
    title: `Interspecies A.I.`,
    description: `TODO / (Equality between the species?) — A transformative response to climate change requires recognizing and valuing the agency and worth of all species. We must move away from human-centric worldviews and acknowledge the interconnectedness of all beings.`,
    author: 'ai',
    tags: ['systemic']
  }
]

export const outputs = [
  {
    id: 'output1',
    title: 'CO₂ reduction',
    description: `<p>Lorem ipsum dolor sit amet, <b>consetetur sadipscing elitr</b>, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>`
  },
  {
    id: 'output2',
    title: 'Health',
    description: `<p>Duis autem vel eum <b>iriure dolor in hendrerit</b> in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>`
  },
  {
    id: 'output3',
    title: 'Happiness',
    description: `<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p><p>Duis <i>autem vel eum</i> iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.`
  },
  {
    id: 'output4',
    title: 'Political stability',
    description: `<p>Nam liber tempor cum <b>soluta</b> nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>`
  },
  {
    id: 'output5',
    title: 'Resources',
    description: 'TODO'
  }
]

for (const id in data) {
  if (id === '') {
    console.log('bki-data2, row skipped, id=', id, data[id])
    continue
  }
  const i = inputs.findIndex(_ => _.id === id)
  if (i < 0) {
    console.warn('bki-data2, key not found', id, data[id])
    continue
  }
  inputs[i] = {...inputs[i], ...data[id]}
}

export { inputs }
