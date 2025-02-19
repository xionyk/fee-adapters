import { CHAIN } from "../../helpers/chains";
import { univ2Adapter } from "../../helpers/getUniSubgraphVolume";

const adapters = univ2Adapter({
  [CHAIN.OKEXCHAIN]: "https://www.okx.com/okc/subgraph/name/okcswap/okc-swap-subgraph-v3",
}, {});

export default adapters;
