import NftDeleter from "@/components/atoms/NftDeleter";
import { OpenSeaLink } from "@/components/atoms/OpenSeaLink";
import { HeroicNamer } from '@/types/contracts';
import { Box, Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { useReadContract } from '@raidguild/quiver';
import React, { useCallback, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiExternalLink } from 'react-icons/hi';

import { HeroicName, HeroicNameListProps } from './types';

async function getHeroNameByIndex(contract: HeroicNamer, address: string, index: number): Promise<HeroicName> {
	const [tokenId, name] = await Promise.all([
		contract.tokenOfOwnerByIndex(address, index),
		contract.nameOfOwnerByIndex(address, index)
	]);

	const heroName = { name, tokenId: tokenId.toNumber() };
	console.log(`HeroicName: ${JSON.stringify(heroName)}`);
	return heroName;
}

export default function HeroicNameList(props: HeroicNameListProps): JSX.Element {
	const { names, contract, address, chainId } = props;
	const [ loading, setLoading ] = React.useState(0);
	const [liveNames, setLiveNames] = React.useState<HeroicName[]>([]);
	const [deletedTokenIds, setDeletedTokenIds] = React.useState<number[]>([]);
	const linkColor = useColorModeValue("secondary.700", "secondary.300");

	const { response: nameCt } = useReadContract(contract, 'balanceOf', [address], {
		autoUpdateInterval: 30000,
	});

	const addLiveName = useCallback((heroName: HeroicName) => {
		console.log(`addLiveName: ${JSON.stringify(heroName)}`);
		setLiveNames((liveNames) => [...liveNames, heroName]);
	}, []);

	const handleDeleted = useCallback((tokenId: number) => {
		console.log(`handleDeleted: ${tokenId}`);
		setDeletedTokenIds((deletedNames) => [...deletedNames, tokenId]);
	}, []);

	useEffect(() => {
		if (nameCt && loading === 0) {
			const nameCount = nameCt.toNumber();
			if (nameCount > liveNames.length) {
				const need = nameCount - liveNames.length;
				console.log(`Loading ${need} names`);
				setLoading(need);
				for (let i=liveNames.length; i<nameCt.toNumber(); i++) {
					getHeroNameByIndex(contract, address, i).then((hero) => {
						addLiveName(hero);
						setLoading((loading) => loading - 1);
					});
				}
			}
		}
	}, [nameCt, liveNames, contract, address, addLiveName, loading]);

	const uniqueNames = React.useMemo(() => {
		const used = new Set<number>(deletedTokenIds);
		const uniqueNamesList: HeroicName[] = [];
		liveNames.forEach((name) => {
			if (!used.has(name.tokenId)) {
				used.add(name.tokenId);
				uniqueNamesList.push(name);
			}
		});

		names.forEach((name) => {
			if (!used.has(name.tokenId)) {
				used.add(name.tokenId);
				uniqueNamesList.push(name);
			}
		});
		console.log({ uniqueNamesList, deletedTokenIds });
		return uniqueNamesList;
	}, [deletedTokenIds, liveNames, names]);

	return (
		<VStack>
			<Box as="h3" fontSize="1.5rem">Your Heroic Names ({nameCt?.toNumber()})</Box>
			{uniqueNames.map((hero) => (
					<Box key={hero.tokenId} verticalAlign="middle" height="2rem">
						<span style={{verticalAlign: 'middle'}}>{hero.name}</span>
						<NftDeleter contract={contract} tokenIndex={hero.tokenId} address={address} onDeleted={handleDeleted}/>
						<OpenSeaLink tokenIndex={hero.tokenId} contract={contract.address} chainId={chainId}>
							<IconButton aria-label="Show on OpenSea" size="xs" ml="0.5rem" icon={<HiExternalLink />} />
						</OpenSeaLink>
					</Box>
			))}
		</VStack>
	);
};
