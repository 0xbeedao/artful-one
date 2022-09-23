import { HeroicNamer } from "@/types/contracts";

export type HeroicName = {
	name: string;
	tokenId: number;
};

export type HeroicNameListProps = {
	address: string;
	names: HeroicName[];
	contract: HeroicNamer;
	chainId: string;
};
