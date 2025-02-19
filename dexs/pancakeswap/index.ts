import { BreakdownAdapter, DISABLED_ADAPTER_KEY } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";
import disabledAdapter from "../../helpers/disabledAdapter";

const {
  getChainVolume,
  DEFAULT_TOTAL_VOLUME_FIELD,
  DEFAULT_DAILY_VOLUME_FIELD,
} = require("../../helpers/getUniSubgraphVolume");
const { BSC } = require("../../helpers/chains");
const { getStartTimestamp } = require("../../helpers/getStartTimestamp");
const endpoints = {
  [CHAIN.BSC]: "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2",
  [CHAIN.ETHEREUM]: "https://api.thegraph.com/subgraphs/name/pancakeswap/exhange-eth"
};

const DAILY_VOLUME_FACTORY = "pancakeDayData";

const graphs = getChainVolume({
  graphUrls: endpoints,
  totalVolume: {
    factory: "pancakeFactories",
    field: DEFAULT_TOTAL_VOLUME_FIELD,
  },
  dailyVolume: {
    factory: DAILY_VOLUME_FACTORY,
    field: DEFAULT_DAILY_VOLUME_FIELD,
  },
});

const adapter: BreakdownAdapter = {
  breakdown: {
    v1: {
      [DISABLED_ADAPTER_KEY]: disabledAdapter
    },
    v2: {
      [CHAIN.BSC]: {
        fetch: graphs(CHAIN.BSC),
        start: getStartTimestamp({
          endpoints,
          chain: CHAIN.BSC,
          dailyDataField: `${DAILY_VOLUME_FACTORY}s`,
        }),
      },
      [CHAIN.ETHEREUM]: {
        fetch: graphs(CHAIN.ETHEREUM),
        start: getStartTimestamp({
          endpoints,
          chain: CHAIN.ETHEREUM,
          dailyDataField: `${DAILY_VOLUME_FACTORY}s`,
        }),
      }
    },
  },
};

export default adapter;
