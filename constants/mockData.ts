export type Statistic = {
  subscribes: number;
  weeklyUtils: number;
};

export interface apiRepoType {
  id: string;
  subscribeStatus: boolean;
  name: string;
  alias: string;
  author: string;
  description: string;
  statistics: Statistic;
}

export const apiReposData: apiRepoType[] = [
  {
    id: "1",
    subscribeStatus: true,
    name: "Weather forecast API",
    alias: "weather-forecast-api",
    author: "wettercom",
    description:
      "Get 16 days weather forecast data - worldwide - geographical coordinates...",
    statistics: {
      subscribes: 100,
      weeklyUtils: 30,
    },
  },
  {
    id: "2",
    subscribeStatus: false,
    name: "API Football Beta",
    alias: "api-football-beta",
    author: "API-Sports",
    description:
      "Beta Program for api-football. Here you can test the next version of the API.",
    statistics: {
      subscribes: 30,
      weeklyUtils: 15,
    },
  },
  {
    id: "3",
    subscribeStatus: false,
    name: "CO2 Offset",
    alias: "co2-offset",
    author: "STROMDAO",
    description:
      "GreenHouseGas/CO2 compensation as a service. Get 1kg/month for free to see how easy it is to implement.",
    statistics: {
      subscribes: 50,
      weeklyUtils: 20,
    },
  },
  {
    id: "4",
    subscribeStatus: false,
    name: "Word Bank World Development Indicators",
    alias: "word-bank-world-development-indicators",
    author: "mfdev",
    description:
      "An API for retrieving world development indicators, that provides high-quality and internationally comparable statistics about global development for the past 60 years. The data contains 1400 indicators for 217 economies and more than 40 country groups. This API also provides a charts API that allows you to visualize data and compare different economies in different charts.",
    statistics: {
      subscribes: 200,
      weeklyUtils: 80,
    },
  },
  {
    id: "5",
    subscribeStatus: false,
    name: "Shopee E-commerce Data",
    alias: "shopee-e-commerce-data",
    author: "tmapi.top",
    description:
      "Get shopee E-commerce plat(Including Thailand, Philippines, Indonesia, Malaysia, Singapore, Vietnam, Taiwan, Brazil) product and shop data",
    statistics: {
      subscribes: 60,
      weeklyUtils: 30,
    },
  },
  {
    id: "6",
    subscribeStatus: true,
    name: "Pharmacity",
    alias: "pharmacity",
    author: "Nguyen Dat",
    description:
      "These are APIs for Pharmacity Company - the largest retail pharmacy chain in Vietnam",
    statistics: {
      subscribes: 30,
      weeklyUtils: 8,
    },
  },
  {
    id: "7",
    subscribeStatus: false,
    name: "MyAnimeList",
    alias: "myanimelist",
    author: "Nguyen Felix Schmitt",
    description: "Get Animes from MyAnimeList (Unofficial)",
    statistics: {
      subscribes: 90,
      weeklyUtils: 30,
    },
  },
  {
    id: "8",
    subscribeStatus: false,
    name: "Utelly",
    alias: "utelly",
    author: "utelly",
    description:
      "Utelly universal search and recommendations APIs for Movies, Series and TV shows.",
    statistics: {
      subscribes: 150,
      weeklyUtils: 80,
    },
  },
  {
    id: "9",
    subscribeStatus: false,
    name: "Tasty",
    alias: "tasty",
    author: "Api Dojo",
    description:
      "API to query data about recipe, plan, ingredients, etc… as on official site",
    statistics: {
      subscribes: 200,
      weeklyUtils: 120,
    },
  },
  {
    id: "10",
    subscribeStatus: true,
    name: "Reddit meme",
    alias: "reddit-meme",
    author: "The Deltaw",
    description:
      "An API for showing the best memes on the internet using Reddit",
    statistics: {
      subscribes: 140,
      weeklyUtils: 70,
    },
  },
];
