import { apiTagTypes } from "./tagTypes";

export type Statistic = {
  subscribes?: number;
  starGazers?: number;
  price?: number;
};

export interface apiRepoType {
  id?: string;
  subscribeStatus?: boolean;
  name?: string;
  alias?: string;
  author?: string;
  username?: string;
  description?: string;
  statistics?: Statistic;
  tags?: apiTagTypes[];
}

export const apiReposData: apiRepoType[] = [
  {
    id: "1",
    subscribeStatus: true,
    name: "Weather forecast API",
    alias: "weather-forecast-api",
    author: "wettercom",
    username: "wettercom",
    description:
      "Get 16 days weather forecast data - worldwide - geographical coordinates...",
    statistics: {
      subscribes: 100,
      starGazers: 30,
      price: 0,
    },
    tags: ["ai", "weather", "environment"],
  },
  {
    id: "2",
    subscribeStatus: false,
    name: "API Football Beta",
    alias: "api-football-beta",
    author: "API Sports",
    username: "api-sports",
    description:
      "Beta Program for api-football. Here you can test the next version of the API.",
    statistics: {
      subscribes: 30,
      starGazers: 15,
      price: 500000,
    },
    tags: ["sport"],
  },
  {
    id: "3",
    subscribeStatus: false,
    name: "CO2 Offset",
    alias: "co2-offset",
    author: "STROMDAO",
    username: "stromdao",
    description:
      "GreenHouseGas/CO2 compensation as a service. Get 1kg/month for free to see how easy it is to implement.",
    statistics: {
      subscribes: 50,
      starGazers: 20,
      price: 0,
    },
    tags: ["environment"],
  },
  {
    id: "4",
    subscribeStatus: false,
    name: "Word Bank World Development Indicators",
    alias: "word-bank-world-development-indicators",
    author: "mfdev",
    username: "mfdev",
    description:
      "An API for retrieving world development indicators, that provides high-quality and internationally comparable statistics about global development for the past 60 years. The data contains 1400 indicators for 217 economies and more than 40 country groups. This API also provides a charts API that allows you to visualize data and compare different economies in different charts.",
    statistics: {
      subscribes: 200,
      starGazers: 80,
      price: 0,
    },
    tags: ["bank", "economics"],
  },
  {
    id: "5",
    subscribeStatus: false,
    name: "Shopee E-commerce Data",
    alias: "shopee-e-commerce-data",
    author: "tmapi.top",
    username: "tmapi-top",
    description:
      "Get shopee E-commerce plat(Including Thailand, Philippines, Indonesia, Malaysia, Singapore, Vietnam, Taiwan, Brazil) product and shop data",
    statistics: {
      subscribes: 60,
      starGazers: 30,
      price: 900000,
    },
    tags: ["e-commerce"],
  },
  {
    id: "6",
    subscribeStatus: true,
    name: "Pharmacity",
    alias: "pharmacity",
    author: "Nguyen Dat",
    username: "nguyen-dat",
    description:
      "These are APIs for Pharmacity Company - the largest retail pharmacy chain in Vietnam",
    statistics: {
      subscribes: 30,
      starGazers: 8,
      price: 0,
    },
    tags: ["healthcare"],
  },
  {
    id: "7",
    subscribeStatus: true,
    name: "MyAnimeList",
    alias: "myanimelist",
    author: "Felix Schmitt",
    username: "felix-schmitt",
    description: "Get Animes from MyAnimeList (Unofficial)",
    statistics: {
      subscribes: 90,
      starGazers: 30,
      price: 750000,
    },
    tags: ["entertainment"],
  },
  {
    id: "8",
    subscribeStatus: false,
    name: "Utelly",
    alias: "utelly",
    author: "utelly",
    username: "utelly",
    description:
      "Utelly universal search and recommendations APIs for Movies, Series and TV shows.",
    statistics: {
      subscribes: 150,
      starGazers: 80,
      price: 0,
    },
    tags: ["ai", "entertainment"],
  },
  {
    id: "9",
    subscribeStatus: true,
    name: "Tasty",
    alias: "tasty",
    author: "Api Dojo",
    username: "api-dojo",
    description:
      "API to query data about recipe, plan, ingredients, etc… as on official site",
    statistics: {
      subscribes: 200,
      starGazers: 120,
      price: 0,
    },
    tags: ["cooking"],
  },
  {
    id: "10",
    subscribeStatus: true,
    name: "Reddit meme",
    alias: "reddit-meme",
    author: "The Deltaw",
    username: "the-deltaw",
    description:
      "An API for showing the best memes on the internet using Reddit",
    statistics: {
      subscribes: 140,
      starGazers: 70,
      price: 100000,
    },
    tags: ["social-network"],
  },
];
