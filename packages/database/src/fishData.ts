import { FishPlace, Fish, FishShadowSize } from './fish';

export const parseRow = (row: string): Fish => {
  const [
    idText,
    nameText,
    priceText,
    shadowSizeText,
    placeText,
    appearanceTimeText,
    ...appearanceMonthsTextArray
  ] = row.split(/\t/);

  const { shadowSize, hasSound, hasFin } = parseShadowSize(shadowSizeText);
  const applyHours = parseApplyHours(appearanceTimeText);
  const applyMonths = parseApplyMonths(appearanceMonthsTextArray);

  return {
    id: +idText,
    name: nameText,
    price: +priceText,
    place: parsePlaceText(placeText),
    shadowSize,
    hasFin,
    hasSound,
    applyHours,
    applyMonths,
  };
};

/**
 * 그림자 크기 텍스트를 FishShadowSize 타입으로 반환하는 함수
 * @param shadowSizeText 그림자 크기 텍스트 또는 숫자
 */
export const parseShadowSize = (
  shadowSizeText: string,
): { shadowSize: FishShadowSize; hasFin: boolean; hasSound: boolean } => {
  let shadowSize: FishShadowSize = null;

  switch (true) {
    // 숫자가 포함되어 있는 경우 해당 숫자를 사용.
    case isNumeric(shadowSizeText):
      shadowSize = +shadowSizeText.replace(/\D/g, '');
      break;
    // 가늘다는 텍스트가 있으면 narrow 반환.
    case isContainNarrow(shadowSizeText):
      shadowSize = 'narrow';
      break;
    default:
      throw TypeError(`유효하지 않은 그림자 텍스트입니다: ${shadowSizeText}`);
  }

  // 지느러미와 울음소리를 파싱
  const hasFin = isContainFin(shadowSizeText);
  const hasSound = isContainSound(shadowSizeText);

  return {
    shadowSize,
    hasFin,
    hasSound,
  };
};

const isNumeric = (source: string) => /\d/.test(source);
const isContainNarrow = (source: string) => /김/.test(source);
const isContainFin = (source: string) => /지느러미/.test(source);
const isContainSound = (source: string) => /울음소리/.test(source);

/**
 * 장소 텍스트를 FishPlace 타입으로 반환하는 함수
 * @param placeText 강, 강(하구), 강(절벽위), 연못, 바다, 바다(부둣가) 등 Raw 텍스트
 */
export const parsePlaceText = (placeText: string): FishPlace[] => {
  return placeText.split(',').map((rawText) => {
    const result = /(?<river>^강$)|(?<clifftop>절벽위)|(?<mouth>하구)|(?<pond>^연못$)|(?<ocean>^바다$)|(?<pier>부둣가)/.exec(
      rawText,
    );

    if (!result) {
      throw Error('유효하지 않은 장소 텍스트입니다. ' + rawText);
    }

    const [fishPlace] = Object.entries(result.groups).find(
      ([, value]) => !!value,
    );

    return fishPlace as FishPlace;
  });
};

/**
 * 출현 시간대 텍스트를 파싱해서 시작 시간과 종료 시간으로 반환하는 함수
 * @param applyHours 시간대를 표시하는 텍스트
 */
export const parseApplyHours = (applyHours: string): [number, number][] => {
  return applyHours.split(',').map((rawText) => {
    if (/하루종일/.test(rawText)) {
      return [0, 23];
    }

    return rawText.split('-').map((word) => {
      const { groups } = /(?<meridiem>오전|오후) (?<hours>\d+)시/.exec(
        word.trim(),
      );
      const { meridiem, hours } = groups;

      return +hours + (meridiem === '오후' ? 12 : 0);
    }) as [number, number];
  });
};

/**
 * 출현 기간 배열을 월 단위의 배열로 반환하는 함수
 * @param applyMonthsTextArray 출현 기간이 담겨있는 배열
 */
export const parseApplyMonths = (applyMonthsTextArray: string[]): number[] => {
  return applyMonthsTextArray.reduce((acc, value, index) => {
    return !!value ? [...acc, index] : acc;
  }, []);
};

const parseSpreadsheet = (source: string): Fish[] =>
  source.trim().split('\n').map(parseRow);

export default parseSpreadsheet(`
1	납줄개	900	1	강	하루종일	1	2	3								11	12	
2	피라미	200	1	강	오전 9시 - 오후 4시	1	2	3	4	5	6	7	8	9	10	11	12	
3	붕어	160	2	강	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
4	황어	240	3	강	오후 4시 - 오전 9시	1	2	3	4	5	6	7	8	9	10	11	12	
5	잉어	300	4	연못	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
6	비단잉어	4000	4	연못	오후 4시 - 오전 9시	1	2	3	4	5	6	7	8	9	10	11	12	
7	금붕어	1300	1	연못	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
8	툭눈금붕어	1300	1	연못	오전 9시 - 오후 4시	1	2	3	4	5	6	7	8	9	10	11	12	
9	난주	4500	2	연못	오전 9시 - 오후 4시	1	2	3	4	5	6	7	8	9	10	11	12	
10	송사리	300	1	연못	하루종일				4	5	6	7	8					
11	가재	200	2	연못	하루종일				4	5	6	7	8	9				
12	자라	3750	4	강	오후 4시 - 오전 9시								8	9				
13	늑대거북	5000	5	강	오후 9시 - 오전 4시				4	5	6	7	8	9	10			
14	올챙이	100	1	연못	하루종일			3	4	5	6	7						
15	개구리	120	2(울음소리)	연못	하루종일					5	6	7	8					
16	동사리	400	2	강	오후 4시 - 오전 9시	1	2	3	4	5	6	7	8	9	10	11	12	
17	미꾸라지	400	2	강	하루종일			3	4	5								
18	메기	800	4	연못	오후 4시 - 오전 9시					5	6	7	8	9	10			
19	가물치	5500	5	연못	오전 9시 - 오후 4시						6	7	8					
20	블루길	180	2	강	오전 9시 - 오후 4시	1	2	3	4	5	6	7	8	9	10	11	12	
21	옐로우퍼치	300	3	강	하루종일	1	2	3							10	11	12	
22	큰입배스	400	4	강	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
23	틸라피아	800	3	강	하루종일						6	7	8	9	10			
24	강꼬치고기	1800	5	강	하루종일									9	10	11	12	
25	빙어	400	2	강	하루종일	1	2										12	
26	은어	900	3	강	하루종일							7	8	9				
27	산천어	1000	3	연못,강(절벽위)	오후 4시 - 오전 9시			3	4	5	6			9	10	11		
28	열목어	3800	3	연못,강(절벽위)	오후 4시 - 오전 9시			3	4	5	6			9	10	11		
29	금송어	15000	3	연못,강(절벽위)	오후 4시 - 오전 9시			3	4	5				9	10	11		
30	일본연어	15000	5	연못,강(절벽위)	오후 4시 - 오전 9시	1	2	3									12	
31	연어	700	4	강(하구)	하루종일									9				
32	왕연어	1800	6	강(하구)	하루종일									9				
33	참게	2000	2	강	오후 4시 - 오전 9시									9	10	11		
34	구피	1300	1	강	오전 9시 - 오후 4시				4	5	6	7	8	9	10	11		
35	닥터피시	1500	2	강	오전 9시 - 오후 4시					5	6	7	8	9				
36	천사어	3000	2	강	오후 4시 - 오전 9시					5	6	7	8	9	10			
37	베타	2500	2	강	오전 9시 - 오후 4시					5	6	7	8	9	10			
38	네온테트라	500	1	강	오전 9시 - 오후 4시				4	5	6	7	8	9	10	11		
39	레인보우피시	800	1	강	오전 9시 - 오후 4시					5	6	7	8	9	10			
40	피라니아	2500	2	강	오전 9시 - 오후 4시,오후 9시 - 오전 4시						6	7	8	9				
41	아로와나	10000	4	강	오후 4시 - 오전 9시						6	7	8	9				
42	황금연어	15000	5	강	오전 4시 - 오후 9시						6	7	8	9				
43	가아	6000	6	연못	오후 4시 - 오전 9시						6	7	8	9				
44	피라루쿠	10000	6	강	오후 4시 - 오전 9시						6	7	8	9				
45	엔드리케리	4000	4	강	오후 9시 - 오전 4시						6	7	8	9				
46	철갑상어	10000	6	강(하구)	하루종일	1	2	3						9	10	11	12	
47	클리오네	1000	1	바다	하루종일	1	2	3									12	
48	해마	1100	1	바다	하루종일				4	5	6	7	8	9	10	11		
49	흰동가리	650	1	바다	하루종일				4	5	6	7	8	9				
50	블루탱	1000	2	바다	하루종일				4	5	6	7	8	9				
51	나비고기	1000	2	바다	하루종일				4	5	6	7	8	9				
52	나폴레옹고기	10000	6	바다	오전 4시 - 오후 9시							7	8					
53	쏨뱅이	500	3	바다	하루종일				4	5	6	7	8	9	10	11		
54	복어	5000	3	바다	오후 9시 - 오전 4시	1	2									11	12	
55	가시복	250	3	바다	하루종일							7	8	9				
56	멸치	200	2	바다	오전 4시 - 오후 9시	1	2	3	4	5	6	7	8	9	10	11	12	
57	전갱이	150	2	바다	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
58	돌돔	5000	3	바다	하루종일			3	4	5	6	7	8	9	10	11		
59	농어	400	5	바다	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
60	도미	3000	4	바다	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
61	가자미	300	3	바다	하루종일	1	2	3	4						10	11	12	
62	넙치	800	5	바다	하루종일	1	2	3	4	5	6	7	8	9	10	11	12	
63	오징어	500	3	바다	하루종일	1	2	3	4	5	6	7	8				12	
64	곰치	2000	굵고 김	바다	하루종일								8	9	10			
65	리본장어	600	가늘고 김	바다	하루종일						6	7	8	9	10			
66	다랑어	7000	6	바다(부둣가)	하루종일	1	2	3	4							11	12	
67	청새치	10000	6	바다(부둣가)	하루종일	1	2	3	4			7	8	9		11	12	
68	무명갈전갱이	4500	5	바다(부둣가)	하루종일					5	6	7	8	9	10			
69	만새기	6000	5	바다(부둣가)	하루종일					5	6	7	8	9	10			
70	개복치	4000	6 (지느러미)	바다	오전 4시 - 오후 9시							7	8	9				
71	가오리	3000	5	바다	오전 4시 - 오후 9시								8	9	10	11		
72	톱상어	12000	6 (지느러미)	바다	오후 4시 - 오전 9시						6	7	8	9				
73	귀상어	8000	6 (지느러미)	바다	오후 4시 - 오전 9시						6	7	8	9				
74	상어	15000	6 (지느러미)	바다	오후 4시 - 오전 9시						6	7	8	9				
75	고래상어	13000	6 (지느러미)	바다	하루종일						6	7	8	9				
76	빨판상어	1500	4 (지느러미)	바다	하루종일						6	7	8	9				
77	초롱아귀	2500	4	바다	오후 4시 - 오전 9시	1	2	3								11	12	
78	산갈치	9000	6	바다	하루종일	1	2	3	4	5							12	
79	데메니기스	15000	2	바다	오후 9시 - 오전 4시	1	2	3	4	5	6	7	8	9	10	11	12	
80	실러캔스	15000	6	바다	하루종일(비 혹은 눈)	1	2	3	4	5	6	7	8	9	10	11	12
`);
