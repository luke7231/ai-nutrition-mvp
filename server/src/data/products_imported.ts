// 이 파일은 자동 생성되었습니다. 수동 수정하지 마세요.
// 재생성: npm run convert:coupang

export interface Product {
  id: string;
  brand: string;
  name: string;
  ingredientId: string; // 주요 성분 ID (호환성 유지)
  ingredient: string; // 주요 성분명
  // 복수 성분 지원 (종합 비타민 등)
  ingredientIds?: string[]; // 포함된 모든 성분 ID 배열
  dailyDosage: number; // 주요 성분의 일일 섭취량
  // 각 성분별 함량 (종합 비타민의 경우)
  dosages?: Record<string, number>; // { "vitaminB": 50, "vitaminC": 500, ... }
  tags: string[];
  image_url: string;
  price: number;
  pillSize: string;
  pillsPerDay: number;
  intakeTime: "morning" | "evening" | "both";
  features: string[];
  essential?: boolean; // light 전략에서 필수 제품 여부
  productUrl?: string; // 쿠팡 제품 URL
  description?: string; // 제품 설명
}

export const products: Product[] = [
  {
    "id": "vitaminA_budget_0",
    "brand": "솔가",
    "name": "솔가 드라이 비타민A 1500mcg 타블렛, 100정, 1개",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "dailyDosage": 1500,
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/1f85/dcbe46c4d8a67cd65225baf05222b24810959fc9d1fa7614c86f66c09176.jpg",
    "price": 12410,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민A 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/2074539?itemId=9357535&vendorItemId=3270592861",
    "description": "비타민 A 보충제, 건식 타블렛 형태, 성인 기준 1일 1알 섭취, 눈 건강 및 면역 기능 지원"
  },
  {
    "id": "vitaminA_budget_1",
    "brand": "뉴트리코스트",
    "name": "뉴트리코스트 비타민 A 10000IU 소프트젤",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "dailyDosage": 10000,
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/954a/c6e0c3c879f8e9b1a0d0bf21f28b00c3bb2bae132eb87d7da013f7279bed.jpg",
    "price": 22820,
    "pillSize": "캡슐형",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민A 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/216731272?itemId=666484606&vendorItemId=4722784812",
    "description": "비타민A 1회 제공량당 10000IU 제공 소프트젤 제형 대두기름 젤라틴 글리세린 물 어간유 함유 1일 1-2캡슐 식사와 함께 섭취 권장"
  },
  {
    "id": "vitaminA_budget_2",
    "brand": "한미양행",
    "name": "한미양행 눈영양 비타민A Health of Eye Vitamin A 120캡슐",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "dailyDosage": 800,
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/1620/18dc67fc0100fb67a9357637a77056b9de9db01d07f33148bfbaf2b79a3e.jpg",
    "price": 13940,
    "pillSize": "캡슐형",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "비타민A 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7638005459?itemId=25860000205&vendorItemId=94055511464",
    "description": "하루 2캡슐 섭취 기준 총 800mg 제공 눈 건강을 위한 비타민A 캡슐 제품"
  },
  {
    "id": "vitaminA_budget_3",
    "brand": "DAYLAB",
    "name": "데이랩 피부 건강 먹는 레티놀 비타민A",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "dailyDosage": 700,
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화"
    ],
    "image_url": "https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/6a8f/6a8f5d8b-92f9-4dd7-b665-514375e3e71d.jpg",
    "price": 12900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민A 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8279658421",
    "description": "DSM사 프리미엄 비타민A 사용, 1일 1정 비타민A 700µg RAE 함유, 피부와 점막 형성 및 기능 유지에 도움, 어두운 곳에서 시각 적응에 필요, 60정 36g 구성"
  },
  {
    "id": "vitaminA_budget_4",
    "brand": "프리벤트라",
    "name": "프리벤트라 츄어블 눈건강 비타민A 블루베리맛 2개월분 / 스위스산 800mcg 영양제 아스파탐NO",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "dailyDosage": 800,
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화"
    ],
    "image_url": "https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/04/17/11/0/90f05b07-4edd-46d8-ae3c-50f23363a91f.png",
    "price": 9800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민A 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8771380759",
    "description": "스위스산 비타민A 아세테이트 사용, 1일 1정 비타민A 800mcg 함유, 츄어블 블루베리맛으로 물 없이 섭취 가능, 아스파탐 무첨가, 눈 건강 및 어두운 곳에서 시각 적응에 도움"
  },
  {
    "id": "omega3_standard_5",
    "brand": "고려은단",
    "name": "고려은단 식물성 퓨어 알티지 오메가3 이지",
    "ingredientId": "omega3",
    "ingredient": "오메가3 (EPA+DHA)",
    "dailyDosage": 600,
    "tags": [
      "혈행 개선",
      "두뇌 건강",
      "심혈관 건강",
      "항산화",
      "콜레스테롤"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/607967258813539-546924f8-fdf1-4e94-9397-1aa8868410df.jpg",
    "price": 44550,
    "pillSize": "캡슐형",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "비린내 없는"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/9240941717",
    "description": "식물성 미세조류 유래 rTG 오메가3, 1일 2캡슐 EPA+DHA 합 600mg 함유(EPA 약 171mg DHA 약 429mg), 비린내 없는 식물성 원료, 흡수율 높은 rTG 형태, 혈행 개선 및 눈 건강 도움"
  },
  {
    "id": "omega3_budget_6",
    "brand": "뉴트리디데이",
    "name": "뉴트리디데이 프리미엄 오메가3 골드 1100",
    "ingredientId": "omega3",
    "ingredient": "오메가3 (EPA+DHA)",
    "dailyDosage": 1100,
    "tags": [
      "혈행 개선",
      "두뇌 건강",
      "심혈관 건강",
      "항산화",
      "콜레스테롤"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/1124887950712676-78e49244-1a7c-46da-8f9c-2c54ed2d4a79.jpg",
    "price": 20900,
    "pillSize": "캡슐형",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "장용성 코팅",
      "비린내 없는"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7821106059",
    "description": "EPA와 DHA 합 1100mg 고함량, 1일 1캡슐 섭취, 장용성 캡슐로 비린내 최소화, 캐나다산 멸치유 사용, 비타민D 25mcg 함유로 뼈 건강 도움, 혈행 개선 및 눈 건강 도움"
  },
  {
    "id": "omega3_budget_7",
    "brand": "나우푸드",
    "name": "나우푸드 멀레큐럴리 디스틸드 오메가3 1000mg 피쉬 소프트젤",
    "ingredientId": "omega3",
    "ingredient": "오메가3 (EPA+DHA)",
    "dailyDosage": 1000,
    "tags": [
      "혈행 개선",
      "두뇌 건강",
      "심혈관 건강",
      "항산화",
      "콜레스테롤"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/0c0c/dc36692699be086d7fbc1898ff739ee0485bb687b907b4fc151e742ec220.jpg",
    "price": 19140,
    "pillSize": "캡슐형",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비린내 없는"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/35838053",
    "description": "분자증류 공법으로 정제된 오메가3, 1캡슐당 오메가3 1000mg 함유(EPA 180mg DHA 120mg), 피쉬 소프트젤 형태로 비린내 최소화, 대용량 200정 구성, 혈행 개선 및 눈 건강 도움"
  },
  {
    "id": "omega3_budget_8",
    "brand": "솔가",
    "name": "솔가 오메가3 피쉬 오일 컨센트레이트 소프트젤",
    "ingredientId": "omega3",
    "ingredient": "오메가3 (EPA+DHA)",
    "dailyDosage": 600,
    "tags": [
      "혈행 개선",
      "두뇌 건강",
      "심혈관 건강",
      "항산화",
      "콜레스테롤"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/product/image/vendoritem/2018/08/29/3267495806/2d7906ad-6d02-4cd3-bf16-8d33287fbb0a.jpg",
    "price": 18340,
    "pillSize": "캡슐형",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "오메가3 (EPA+DHA) 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8203831437",
    "description": "분자증류 공법으로 정제된 오메가3, EPA와 DHA 함유, 1일 2캡슐 섭취 기준, 깊은 바다 냉수성 어류 유래 원료 사용, 혈행 개선 및 눈 건강에 도움, 글루텐 프리"
  },
  {
    "id": "multi_budget_9",
    "brand": "종근당",
    "name": "종근당 칼슘 앤 마그네슘 비타민D 아연",
    "ingredientId": "calcium",
    "ingredient": "칼슘",
    "ingredientIds": [
      "calcium",
      "magnesium",
      "vitaminD",
      "zinc"
    ],
    "dailyDosage": 2000,
    "dosages": {
      "calcium": 300,
      "magnesium": 150,
      "vitaminD": 200,
      "zinc": 15
    },
    "tags": [
      "골밀도",
      "골다공증 예방",
      "칼슘 흡수",
      "근육 이완",
      "근육 건강",
      "수면 개선",
      "스트레스 완화",
      "우울감",
      "수면 장애",
      "면역력",
      "피부 건강",
      "상처 치유",
      "탈모 관리"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/254886288387523-c5e901bb-1dab-4064-b491-1b17236aec73.png",
    "price": 13650,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "종합 비타민",
      "다중 영양소 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/5545887952",
    "description": "칼슘 300mg 마그네슘 150mg 아연 8.5mg 비타민D 200IU 포함"
  },
  {
    "id": "multi_budget_10",
    "brand": "뉴트리디데이",
    "name": "뉴트리디데이 프리미엄 칼슘 마그네슘 아연 비타민D",
    "ingredientId": "calcium",
    "ingredient": "칼슘",
    "ingredientIds": [
      "calcium",
      "magnesium",
      "vitaminD",
      "zinc"
    ],
    "dailyDosage": 300,
    "dosages": {
      "calcium": 300,
      "magnesium": 150,
      "vitaminD": 10,
      "zinc": 6
    },
    "tags": [
      "골밀도",
      "골다공증 예방",
      "칼슘 흡수",
      "근육 이완",
      "근육 건강",
      "수면 개선",
      "스트레스 완화",
      "우울감",
      "수면 장애",
      "면역력",
      "피부 건강",
      "상처 치유",
      "탈모 관리"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/246581360606329-21d59b72-ec31-4d63-9882-18aca3f8c90d.jpg",
    "price": 10900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "종합 비타민",
      "다중 영양소 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7663082990",
    "description": "칼슘 300mg 마그네슘 150mg 아연 6mg 비타민D 10µg 포함, 하루 1정 복용, 뼈·근육·면역 기능에 도움"
  },
  {
    "id": "multi_budget_11",
    "brand": "닥터브라이언",
    "name": "닥터브라이언 칼슘 마그네슘 비타민D 아연 영양제",
    "ingredientId": "calcium",
    "ingredient": "칼슘",
    "ingredientIds": [
      "calcium",
      "magnesium",
      "vitaminD",
      "zinc"
    ],
    "dailyDosage": 300,
    "dosages": {
      "calcium": 300,
      "magnesium": 150,
      "vitaminD": 10,
      "zinc": 6
    },
    "tags": [
      "골밀도",
      "골다공증 예방",
      "칼슘 흡수",
      "근육 이완",
      "근육 건강",
      "수면 개선",
      "스트레스 완화",
      "우울감",
      "수면 장애",
      "면역력",
      "피부 건강",
      "상처 치유",
      "탈모 관리"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/615835385342656-d2d5e56c-17fa-4cdd-9d62-4f76021cdaa3.jpg",
    "price": 12900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "종합 비타민",
      "다중 영양소 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/1198439018",
    "description": "칼슘 300mg 마그네슘 150mg 비타민D 10µg 아연 6mg 포함, 하루 1정 복용, 뼈·근육·면역 건강에 도움"
  },
  {
    "id": "multi_budget_12",
    "brand": "뉴트리디데이",
    "name": "뉴트리디데이 프리미엄 루테인 골드, 90정, 1개",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "ingredientIds": [
      "vitaminA",
      "zinc",
      "lutein"
    ],
    "dailyDosage": 20,
    "dosages": {
      "vitaminA": 1500,
      "zinc": 15,
      "lutein": 20
    },
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화",
      "상처 치유",
      "탈모 관리",
      "눈 침침함",
      "황반변성"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/322714536704564-ee912586-0534-4973-8776-096401edb6b4.jpg",
    "price": 11900,
    "pillSize": "캡슐형",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7497623760",
    "description": "루테인 20mg 비타민A 700ug 아연 8.5mg 함유, 하루 1캡슐 섭취, 눈 건강 복합 기능성 제품"
  },
  {
    "id": "multi_budget_13",
    "brand": "99바이탈",
    "name": "99바이탈 편안한 눈 루테인 미니",
    "ingredientId": "vitaminA",
    "ingredient": "비타민A",
    "ingredientIds": [
      "vitaminA",
      "lutein"
    ],
    "dailyDosage": 20,
    "dosages": {
      "vitaminA": 1500,
      "lutein": 20
    },
    "tags": [
      "눈 건강",
      "면역력",
      "야맹증",
      "피부 건강",
      "항산화",
      "눈 침침함",
      "황반변성"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/0bd4/442f0adc4d4e4a19ec37903cc1371911bff50dd5a2c6bc8ab4b62947d94b.jpg",
    "price": 9900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "종합 비타민",
      "다중 영양소 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8936251513",
    "description": "루테인 20mg 비타민A 210ug 포함 눈건강용 복합 영양제 하루 1정 섭취"
  },
  {
    "id": "lutein_budget_14",
    "brand": "고려은단",
    "name": "고려은단 루테인 지아잔틴 아스타잔틴",
    "ingredientId": "lutein",
    "ingredient": "루테인",
    "dailyDosage": 20,
    "tags": [
      "눈 건강",
      "눈 침침함",
      "황반변성",
      "항산화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/5c01/efec4464feac60af1f697760ca69a9fda4ecd3fc0a3b3065412286297eda.jpg",
    "price": 22900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "루테인 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7660979010",
    "description": "루테인 20mg 함유, 지아잔틴 및 아스타잔틴 복합 배합, 하루 1정 섭취"
  },
  {
    "id": "vitaminB_budget_15",
    "brand": "종근당",
    "name": "활력 비타민B 플러스",
    "ingredientId": "vitaminB",
    "ingredient": "비타민B 복합체",
    "dailyDosage": 200,
    "tags": [
      "피로 회복",
      "만성 피로",
      "에너지",
      "신경 건강",
      "스트레스 완화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/64701004396084-a0fa4504-db04-402d-98bf-5ca6d240887c.jpg",
    "price": 13620,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민B 복합체 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7771987825?itemId=20984331533&vendorItemId=4102497417",
    "description": "비타민B군 복합 영양제, 1일 섭취량 기준 비타민B 총 200mg 함유, 에너지 대사 및 피로 개선 도움"
  },
  {
    "id": "vitaminB_budget_16",
    "brand": "뉴트리디데이",
    "name": "프리미엄 비타민B",
    "ingredientId": "vitaminB",
    "ingredient": "비타민B 복합체",
    "dailyDosage": 5,
    "tags": [
      "피로 회복",
      "만성 피로",
      "에너지",
      "신경 건강",
      "스트레스 완화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/13305857041166-24a8c7d2-3220-4ec4-8354-67a76a81460a.jpg",
    "price": 10800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민B 복합체 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7792449539",
    "description": "비타민B 단일 제품,1일 섭취량 기준 비타민B 5mg 함유"
  },
  {
    "id": "vitaminB_budget_17",
    "brand": "99바이탈",
    "name": "활력 비타민B",
    "ingredientId": "vitaminB",
    "ingredient": "비타민B 복합체",
    "dailyDosage": 3,
    "tags": [
      "피로 회복",
      "만성 피로",
      "에너지",
      "신경 건강",
      "스트레스 완화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/5fd9/1bc48d1287cd807790e4c48c8ccbe034688a27fffcb6c98d17dd7072cbd2.jpg",
    "price": 9900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민B 복합체 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8936239398",
    "description": "비타민B 단일 성분, 1일 섭취 기준 비타민B 3mg 함유"
  },
  {
    "id": "vitaminB_budget_18",
    "brand": "솔가",
    "name": "솔가 B-컴플렉스 100 베지터블 캡슐",
    "ingredientId": "vitaminB",
    "ingredient": "비타민B 복합체",
    "dailyDosage": 4,
    "tags": [
      "피로 회복",
      "만성 피로",
      "에너지",
      "신경 건강",
      "스트레스 완화"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/5349/766d068f5369cc28c90bd99b567c814aec651b818762c5524dba0bab1390.jpg",
    "price": 23540,
    "pillSize": "캡슐형",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민B 복합체 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8136129840?itemId=9354802&vendorItemId=3180840912",
    "description": "비타민B 단일 제품 하루 섭취 기준 4mg"
  },
  {
    "id": "vitaminC_budget_19",
    "brand": "바이탈프로그램",
    "name": "비타민C 1000mg",
    "ingredientId": "vitaminC",
    "ingredient": "비타민C",
    "dailyDosage": 1000,
    "tags": [
      "면역력",
      "항산화",
      "피부 건강",
      "피부 보습",
      "노화 방지"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/989605916623240-02949ac5-8ff6-4a47-a3fa-b7b82f0eba07.jpg",
    "price": 11500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/6903873562?itemId=1088946",
    "description": "1정당 비타민C 1000mg 고함량 단일 비타민C, 하루 1정 섭취, 200정 대용량"
  },
  {
    "id": "vitaminC_budget_20",
    "brand": "고려은단",
    "name": "고려은단 비타민C 1000 + 쇼핑백",
    "ingredientId": "vitaminC",
    "ingredient": "비타민C",
    "dailyDosage": 1000,
    "tags": [
      "면역력",
      "항산화",
      "피부 건강",
      "피부 보습",
      "노화 방지"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/37484876590636-82684533-c55e-4faf-b20d-ec9ffacedfdd.jpg",
    "price": 17900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "비타민C 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/9192490440",
    "description": "영국산 비타민C 1000mg 함유 단일 비타민C 제품"
  },
  {
    "id": "vitaminC_budget_21",
    "brand": "고려은단",
    "name": "메가도스 비타민C 3000mg",
    "ingredientId": "vitaminC",
    "ingredient": "비타민C",
    "dailyDosage": 3000,
    "tags": [
      "면역력",
      "항산화",
      "피부 건강",
      "피부 보습",
      "노화 방지"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/327375129328122-940656a1-9ea7-4d89-83e2-4d3b18598098.jpg",
    "price": 17900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/46208003",
    "description": "영국산 비타민C 분말, 1회 섭취 기준 비타민C 3000mg 고함량 메가도스, 스틱형 가루 타입으로 물에 타서 섭취"
  },
  {
    "id": "vitaminC_budget_22",
    "brand": "종근당건강",
    "name": "프리미엄 비타C 1000플러스",
    "ingredientId": "vitaminC",
    "ingredient": "비타민C",
    "dailyDosage": 1000,
    "tags": [
      "면역력",
      "항산화",
      "피부 건강",
      "피부 보습",
      "노화 방지"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/45464390251628-910fea1a-4d12-4f97-9dc2-a5455ed329ad.jpg",
    "price": 10450,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7757634572",
    "description": "비타민C 1000mg 고함량 단일 영양제, 하루 1정 섭취, 항산화 및 면역력 관리에 도움"
  },
  {
    "id": "coq10_budget_23",
    "brand": "뉴트리디데이",
    "name": "프리미엄 코엔자임 Q10 60정",
    "ingredientId": "coq10",
    "ingredient": "코엔자임 Q10",
    "dailyDosage": 100,
    "tags": [
      "에너지",
      "항산화",
      "심혈관 건강",
      "피로 회복",
      "기력 저하"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/5687203108032-ae040d2f-1bea-4365-92c9-f85ff10aa7c6.jpg",
    "price": 14900,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "코엔자임 Q10 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/6685022358?itemId=20066806393",
    "description": "코엔자임Q10 100mg 단일 성분, 항산화 및 에너지 생성 보조, 하루 1정 섭취"
  },
  {
    "id": "coq10_budget_24",
    "brand": "동화약품",
    "name": "코엔자임 Q10 코큐텐 맥스 혈압 항산화 케어 관리 조절",
    "ingredientId": "coq10",
    "ingredient": "코엔자임 Q10",
    "dailyDosage": 100,
    "tags": [
      "에너지",
      "항산화",
      "심혈관 건강",
      "피로 회복",
      "기력 저하"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/1846990611572953-dc01ac65-b165-4ba7-bcb3-570a9a965478.jpg",
    "price": 14600,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "코엔자임 Q10 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/7835316582",
    "description": "코엔자임Q10 100mg 함유, 하루 1정 섭취, 항산화 및 혈압 관리에 도움"
  },
  {
    "id": "coq10_budget_25",
    "brand": "종근당",
    "name": "종근당 활력 코엔자임Q10 플러스",
    "ingredientId": "coq10",
    "ingredient": "코엔자임 Q10",
    "dailyDosage": 100,
    "tags": [
      "에너지",
      "항산화",
      "심혈관 건강",
      "피로 회복",
      "기력 저하"
    ],
    "image_url": "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/6175366625766-f64c27d9-3406-43bf-b202-1a9fffae5f24.jpg",
    "price": 10800,
    "pillSize": "캡슐형",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "코엔자임 Q10 함유"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/8222293230",
    "description": "코엔자임Q10 100mg 함유, 하루 1캡슐 섭취, 항산화 및 높은 혈압 감소에 도움"
  },
  {
    "id": "silymarin_budget_26",
    "brand": "(더미)나우푸드",
    "name": "밀크씨슬 420mg",
    "ingredientId": "silymarin",
    "ingredient": "밀크씨슬 (실리마린)",
    "dailyDosage": 420,
    "tags": [
      "간 건강",
      "항산화",
      "피로 회복",
      "숙취 해소"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=밀크씨슬",
    "price": 18900,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "GMP 인증 시설에서 생산된 고함량 실리마린",
    "description": "간 건강 기능성 인정 원료"
  },
  {
    "id": "silymarin_budget_27",
    "brand": "(더미)나우푸드",
    "name": "밀크씨슬 420mg",
    "ingredientId": "silymarin",
    "ingredient": "밀크씨슬 (실리마린)",
    "dailyDosage": 420,
    "tags": [
      "간 건강",
      "항산화",
      "피로 회복",
      "숙취 해소"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=밀크씨슬",
    "price": 18900,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "GMP 인증 시설에서 생산",
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-silymarin-1",
    "description": "GMP 인증 시설에서 생산된 고함량 실리마린, 간 건강 기능성 인정 원료, 하루 2정 섭취"
  },
  {
    "id": "silymarin_standard_28",
    "brand": "(더미)종근당",
    "name": "밀크씨슬 실리마린 500mg",
    "ingredientId": "silymarin",
    "ingredient": "밀크씨슬 (실리마린)",
    "dailyDosage": 500,
    "tags": [
      "간 건강",
      "항산화",
      "피로 회복",
      "숙취 해소"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=밀크씨슬",
    "price": 28500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "유기농 인증",
      "고함량 함유",
      "표준화 추출물 사용"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-silymarin-2",
    "description": "실리마린 표준화 추출물 사용, 유기농 인증, 고함량 실리마린 함유, 하루 1정 섭취"
  },
  {
    "id": "silymarin_standard_29",
    "brand": "(더미)솔가",
    "name": "프리미엄 밀크씨슬 600mg",
    "ingredientId": "silymarin",
    "ingredient": "밀크씨슬 (실리마린)",
    "dailyDosage": 600,
    "tags": [
      "간 건강",
      "항산화",
      "피로 회복",
      "숙취 해소"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=밀크씨슬",
    "price": 42000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정",
      "표준화 추출물 사용"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-silymarin-3",
    "description": "실리마린 표준화 추출물, 간 건강 기능성 인정, 프리미엄 원료 사용, 하루 1정 섭취"
  },
  {
    "id": "glucosamine_budget_30",
    "brand": "(더미)동화약품",
    "name": "글루코사민 1500mg",
    "ingredientId": "glucosamine",
    "ingredient": "글루코사민",
    "dailyDosage": 1500,
    "tags": [
      "관절 통증",
      "관절 건강",
      "퇴행성 관절염",
      "근육 건강"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=글루코사민",
    "price": 22500,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-glucosamine-1",
    "description": "글루코사민 HCl 고함량, 관절 건강 기능성 인정, 관절 통증 완화에 도움, 하루 2정 섭취"
  },
  {
    "id": "glucosamine_standard_31",
    "brand": "(더미)종근당",
    "name": "글루코사민 콘드로이틴 복합",
    "ingredientId": "glucosamine",
    "ingredient": "글루코사민",
    "dailyDosage": 1500,
    "tags": [
      "관절 통증",
      "관절 건강",
      "퇴행성 관절염",
      "근육 건강"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=글루코사민",
    "price": 32000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-glucosamine-2",
    "description": "글루코사민과 콘드로이틴 복합 배합, 관절 건강 기능성 인정, 고함량 제형, 하루 1정 섭취"
  },
  {
    "id": "glucosamine_premium_32",
    "brand": "(더미)고려은단",
    "name": "프리미엄 글루코사민 1800mg",
    "ingredientId": "glucosamine",
    "ingredient": "글루코사민",
    "dailyDosage": 1800,
    "tags": [
      "관절 통증",
      "관절 건강",
      "퇴행성 관절염",
      "근육 건강"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=글루코사민",
    "price": 48000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-glucosamine-3",
    "description": "글루코사민 HCl 고함량, 관절 건강 기능성 인정, 프리미엄 원료 사용, 하루 1정 섭취"
  },
  {
    "id": "magnesium_budget_33",
    "brand": "(더미)뉴트리디데이",
    "name": "마그네슘 350mg",
    "ingredientId": "magnesium",
    "ingredient": "마그네슘",
    "dailyDosage": 350,
    "tags": [
      "수면 개선",
      "근육 이완",
      "스트레스 완화",
      "우울감",
      "수면 장애"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=마그네슘",
    "price": 15800,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "기능성 인정",
      "고흡수율"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-magnesium-1",
    "description": "고흡수율 마그네슘 시트레이트, 수면 개선 기능성 인정, 근육 이완 지원, 하루 2정 섭취"
  },
  {
    "id": "magnesium_budget_34",
    "brand": "(더미)종근당",
    "name": "마그네슘 플러스",
    "ingredientId": "magnesium",
    "ingredient": "마그네슘",
    "dailyDosage": 400,
    "tags": [
      "수면 개선",
      "근육 이완",
      "스트레스 완화",
      "우울감",
      "수면 장애"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=마그네슘",
    "price": 24500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-magnesium-2",
    "description": "마그네슘 시트레이트 고함량, 수면 개선 기능성 인정, 스트레스 완화, 하루 1정 섭취"
  },
  {
    "id": "magnesium_standard_35",
    "brand": "(더미)솔가",
    "name": "프리미엄 마그네슘 450mg",
    "ingredientId": "magnesium",
    "ingredient": "마그네슘",
    "dailyDosage": 450,
    "tags": [
      "수면 개선",
      "근육 이완",
      "스트레스 완화",
      "우울감",
      "수면 장애"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=마그네슘",
    "price": 38000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정",
      "고흡수율"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-magnesium-3",
    "description": "고흡수율 마그네슘 시트레이트, 수면 개선 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "calcium_budget_36",
    "brand": "(더미)동화약품",
    "name": "칼슘 700mg",
    "ingredientId": "calcium",
    "ingredient": "칼슘",
    "dailyDosage": 700,
    "tags": [
      "골밀도",
      "골다공증 예방",
      "칼슘 흡수",
      "근육 이완",
      "근육 건강"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=칼슘",
    "price": 16800,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-calcium-1",
    "description": "구연산 칼슘 사용, 뼈 건강 기능성 인정, 비타민D와 시너지, 하루 2정 섭취"
  },
  {
    "id": "calcium_standard_37",
    "brand": "(더미)종근당",
    "name": "칼슘 플러스",
    "ingredientId": "calcium",
    "ingredient": "칼슘",
    "dailyDosage": 1000,
    "tags": [
      "골밀도",
      "골다공증 예방",
      "칼슘 흡수",
      "근육 이완",
      "근육 건강"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=칼슘",
    "price": 26500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-calcium-2",
    "description": "구연산 칼슘 고함량, 뼈 건강 기능성 인정, 흡수율 개선 포뮬라, 하루 1정 섭취"
  },
  {
    "id": "calcium_standard_38",
    "brand": "(더미)고려은단",
    "name": "프리미엄 칼슘 1200mg",
    "ingredientId": "calcium",
    "ingredient": "칼슘",
    "dailyDosage": 1200,
    "tags": [
      "골밀도",
      "골다공증 예방",
      "칼슘 흡수",
      "근육 이완",
      "근육 건강"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=칼슘",
    "price": 42000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-calcium-3",
    "description": "구연산 칼슘 고함량, 뼈 건강 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "vitaminD_budget_39",
    "brand": "(더미)뉴트리디데이",
    "name": "비타민D 2000IU",
    "ingredientId": "vitaminD",
    "ingredient": "비타민D3",
    "dailyDosage": 2000,
    "tags": [
      "골밀도",
      "골다공증 예방",
      "면역력",
      "칼슘 흡수"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=비타민D",
    "price": 14200,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정",
      "활성형"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-vitaminD-1",
    "description": "D3 활성형 사용, 칼슘 흡수 촉진, 골 건강 기능성 인정, 하루 1정 섭취"
  },
  {
    "id": "vitaminD_budget_40",
    "brand": "(더미)종근당",
    "name": "비타민D3 3000IU",
    "ingredientId": "vitaminD",
    "ingredient": "비타민D3",
    "dailyDosage": 3000,
    "tags": [
      "골밀도",
      "골다공증 예방",
      "면역력",
      "칼슘 흡수"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=비타민D",
    "price": 22800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "활성형"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-vitaminD-2",
    "description": "D3 활성형 고함량, 칼슘 흡수 촉진, 면역력 지원, 하루 1정 섭취"
  },
  {
    "id": "vitaminD_standard_41",
    "brand": "(더미)솔가",
    "name": "프리미엄 비타민D3 4000IU",
    "ingredientId": "vitaminD",
    "ingredient": "비타민D3",
    "dailyDosage": 4000,
    "tags": [
      "골밀도",
      "골다공증 예방",
      "면역력",
      "칼슘 흡수"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=비타민D",
    "price": 35000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정",
      "활성형"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-vitaminD-3",
    "description": "D3 활성형 고함량, 골 건강 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "probiotics_budget_42",
    "brand": "(더미)동화약품",
    "name": "프로바이오틱스 50억",
    "ingredientId": "probiotics",
    "ingredient": "프로바이오틱스",
    "dailyDosage": 50,
    "tags": [
      "장 건강",
      "면역력",
      "소화 개선",
      "변비 개선"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=프로바이오틱스",
    "price": 19800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-probiotics-1",
    "description": "다양한 균주 함유, 장 건강 기능성 인정, 면역력 향상, 하루 1정 섭취"
  },
  {
    "id": "probiotics_standard_43",
    "brand": "(더미)종근당",
    "name": "프로바이오틱스 플러스",
    "ingredientId": "probiotics",
    "ingredient": "프로바이오틱스",
    "dailyDosage": 100,
    "tags": [
      "장 건강",
      "면역력",
      "소화 개선",
      "변비 개선"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=프로바이오틱스",
    "price": 28500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정",
      "장용성 코팅"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-probiotics-2",
    "description": "다양한 균주 고함량, 장 건강 기능성 인정, 장용성 코팅, 하루 1정 섭취"
  },
  {
    "id": "probiotics_premium_44",
    "brand": "(더미)고려은단",
    "name": "프리미엄 프로바이오틱스 150억",
    "ingredientId": "probiotics",
    "ingredient": "프로바이오틱스",
    "dailyDosage": 150,
    "tags": [
      "장 건강",
      "면역력",
      "소화 개선",
      "변비 개선"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=프로바이오틱스",
    "price": 45000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-probiotics-3",
    "description": "다양한 균주 초고함량, 장 건강 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "lutein_budget_45",
    "brand": "(더미)뉴트리디데이",
    "name": "루테인 20mg",
    "ingredientId": "lutein",
    "ingredient": "루테인",
    "dailyDosage": 20,
    "tags": [
      "눈 건강",
      "눈 침침함",
      "황반변성",
      "항산화"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=루테인",
    "price": 18500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-lutein-1",
    "description": "제아잔틴 복합, 눈 건강 기능성 인정, 황반변성 예방, 하루 1정 섭취"
  },
  {
    "id": "lutein_standard_46",
    "brand": "(더미)종근당",
    "name": "루테인 플러스",
    "ingredientId": "lutein",
    "ingredient": "루테인",
    "dailyDosage": 30,
    "tags": [
      "눈 건강",
      "눈 침침함",
      "황반변성",
      "항산화"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=루테인",
    "price": 26500,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-lutein-2",
    "description": "제아잔틴 복합 고함량, 눈 건강 기능성 인정, 항산화 작용, 하루 1정 섭취"
  },
  {
    "id": "lutein_standard_47",
    "brand": "(더미)솔가",
    "name": "프리미엄 루테인 40mg",
    "ingredientId": "lutein",
    "ingredient": "루테인",
    "dailyDosage": 40,
    "tags": [
      "눈 건강",
      "눈 침침함",
      "황반변성",
      "항산화"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=루테인",
    "price": 42000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-lutein-3",
    "description": "제아잔틴 복합 초고함량, 눈 건강 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "zinc_budget_48",
    "brand": "(더미)동화약품",
    "name": "아연 15mg",
    "ingredientId": "zinc",
    "ingredient": "아연",
    "dailyDosage": 15,
    "tags": [
      "면역력",
      "피부 건강",
      "상처 치유",
      "탈모 관리"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=아연",
    "price": 12800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정",
      "고흡수율"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-zinc-1",
    "description": "고흡수율 아연 피콜리네이트, 면역력 강화 기능성 인정, 상처 치유 촉진, 하루 1정 섭취"
  },
  {
    "id": "zinc_budget_49",
    "brand": "(더미)종근당",
    "name": "아연 플러스",
    "ingredientId": "zinc",
    "ingredient": "아연",
    "dailyDosage": 20,
    "tags": [
      "면역력",
      "피부 건강",
      "상처 치유",
      "탈모 관리"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=아연",
    "price": 19800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-zinc-2",
    "description": "아연 피콜리네이트 고함량, 면역력 강화 기능성 인정, 항산화 지원, 하루 1정 섭취"
  },
  {
    "id": "zinc_standard_50",
    "brand": "(더미)고려은단",
    "name": "프리미엄 아연 25mg",
    "ingredientId": "zinc",
    "ingredient": "아연",
    "dailyDosage": 25,
    "tags": [
      "면역력",
      "피부 건강",
      "상처 치유",
      "탈모 관리"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=아연",
    "price": 32000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-zinc-3",
    "description": "아연 피콜리네이트 초고함량, 면역력 강화 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "iron_budget_51",
    "brand": "(더미)뉴트리디데이",
    "name": "철분 15mg",
    "ingredientId": "iron",
    "ingredient": "철분",
    "dailyDosage": 15,
    "tags": [
      "빈혈 예방",
      "철분 보충",
      "임신 준비",
      "에너지"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=철분",
    "price": 14200,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-iron-1",
    "description": "비헤마 철분 사용, 빈혈 예방 기능성 인정, 위장 자극 최소화, 하루 1정 섭취"
  },
  {
    "id": "iron_budget_52",
    "brand": "(더미)종근당",
    "name": "철분 플러스",
    "ingredientId": "iron",
    "ingredient": "철분",
    "dailyDosage": 20,
    "tags": [
      "빈혈 예방",
      "철분 보충",
      "임신 준비",
      "에너지"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=철분",
    "price": 22800,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-iron-2",
    "description": "비헤마 철분 고함량, 빈혈 예방 기능성 인정, 철분 흡수 촉진, 하루 1정 섭취"
  },
  {
    "id": "iron_standard_53",
    "brand": "(더미)솔가",
    "name": "프리미엄 철분 25mg",
    "ingredientId": "iron",
    "ingredient": "철분",
    "dailyDosage": 25,
    "tags": [
      "빈혈 예방",
      "철분 보충",
      "임신 준비",
      "에너지"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=철분",
    "price": 38000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-iron-3",
    "description": "비헤마 철분 초고함량, 빈혈 예방 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  },
  {
    "id": "collagen_budget_54",
    "brand": "(더미)동화약품",
    "name": "콜라겐 1000mg",
    "ingredientId": "collagen",
    "ingredient": "콜라겐",
    "dailyDosage": 1000,
    "tags": [
      "피부 건강",
      "피부 보습",
      "관절 건강",
      "탄력 저하",
      "노화 방지"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=콜라겐",
    "price": 19800,
    "pillSize": "중간 정제",
    "pillsPerDay": 2,
    "intakeTime": "both",
    "features": [
      "기능성 인정"
    ],
    "essential": true,
    "productUrl": "https://www.coupang.com/vp/products/dummy-collagen-1",
    "description": "해양 콜라겐 펩타이드, 피부 건강 기능성 인정, 관절 건강 지원, 하루 2정 섭취"
  },
  {
    "id": "collagen_standard_55",
    "brand": "(더미)종근당",
    "name": "콜라겐 플러스",
    "ingredientId": "collagen",
    "ingredient": "콜라겐",
    "dailyDosage": 2000,
    "tags": [
      "피부 건강",
      "피부 보습",
      "관절 건강",
      "탄력 저하",
      "노화 방지"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=콜라겐",
    "price": 32000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-collagen-2",
    "description": "해양 콜라겐 펩타이드 고함량, 피부 건강 기능성 인정, 고분해 저분자, 하루 1정 섭취"
  },
  {
    "id": "collagen_premium_56",
    "brand": "(더미)고려은단",
    "name": "프리미엄 콜라겐 5000mg",
    "ingredientId": "collagen",
    "ingredient": "콜라겐",
    "dailyDosage": 5000,
    "tags": [
      "피부 건강",
      "피부 보습",
      "관절 건강",
      "탄력 저하",
      "노화 방지"
    ],
    "image_url": "https://via.placeholder.com/320x320?text=콜라겐",
    "price": 48000,
    "pillSize": "중간 정제",
    "pillsPerDay": 1,
    "intakeTime": "both",
    "features": [
      "고함량 함유",
      "기능성 인정"
    ],
    "essential": false,
    "productUrl": "https://www.coupang.com/vp/products/dummy-collagen-3",
    "description": "해양 콜라겐 펩타이드 초고함량, 피부 건강 기능성 인정, 프리미엄 제형, 하루 1정 섭취"
  }
] as Product[];

export const productCount = 57;
