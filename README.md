# 5urf Twitter

> **레트로 감성의 소셜 미디어 플랫폼**  
> 사용자들이 생각과 순간을 공유할 수 있는 현대적이면서도 향수를 불러일으키는 트위터 클론 프로젝트입니다.

<p align="center">
  <img width="500" alt="5urf Twitter Home Screenshot" src="https://github.com/user-attachments/assets/0d7292b8-e8a8-42cf-b08a-954a6f151faf" />
</p>

## 🔗 데모 링크

**🌐 [Live Demo](https://5urf-twitter.vercel.app)**

### 테스트 계정

```
이메일: test@example.com
비밀번호: test1234567
```

## ✨ 주요 기능

### 🔐 사용자 인증 시스템

- **회원가입 & 로그인**: iron-session을 활용한 안전한 세션 관리
- **비밀번호 암호화**: bcryptjs를 통한 안전한 비밀번호 해싱
- **실시간 유효성 검증**: Zod 스키마를 활용한 클라이언트/서버 양방향 검증

<img width="500" alt="회원가입 유효성 검사 예시" src="https://github.com/user-attachments/assets/d49d4b0f-3c16-4161-8424-09a2ff40549a" />

### 📝 트윗 관리

- **트윗 작성**: 200자 제한의 실시간 글자 수 카운터
- **트윗 수정 & 삭제**: 소유자 권한 확인을 통한 안전한 CRUD
- **실시간 상태 표시**: 낙관적 업데이트(Optimistic Updates)로 부드러운 UX

<img width="500" alt="트윗 수정" src="https://github.com/user-attachments/assets/11e09b58-b1bc-40c4-834f-6031b54dee88" />

### 💖 상호작용 기능

- **좋아요 시스템**: 실시간 좋아요 토글 및 카운터
- **댓글 시스템**: 트윗별 댓글 작성, 수정, 삭제
- **사용자 프로필**: 개인정보 수정, 비밀번호 변경, 회원 탈퇴

<img width="500" alt="댓글" src="https://github.com/user-attachments/assets/1700815a-b6ba-4501-847f-c2c34b32f75f" />

### 🔍 검색 & 탐색

- **통합 검색**: 트윗 내용과 사용자명 동시 검색
- **페이지네이션**: 효율적인 데이터 로딩과 탐색
- **사용자 프로필 페이지**: 개인별 트윗 모음 및 활동 기록

<img width="500" alt="프로필 페이지" src="https://github.com/user-attachments/assets/719efb03-968c-44c3-a093-5aea20de69d2" />

### 🎨 사용자 경험

- **다크모드 지원**: 라이트/다크 테마 토글
- **레트로 디자인**: 픽셀 폰트와 레트로 스타일의 독특한 UI
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 대응
- **로딩 상태 관리**: 스켈레톤 UI

<img width="500" alt="다크모드" src="https://github.com/user-attachments/assets/851d9f15-3ca6-4906-812a-67219601eb36" />

## 🛠 기술 스택

### Frontend

- **Next.js 15**
- **TypeScript**
- **TailwindCSS**
- **Lucide React**

### Backend & Database

- **Next.js API Routes & Server Actions**
- **Prisma**
- **iron-session**
- **bcryptjs**
- **Zod**

## 📁 프로젝트 구조

```
5urf-twitter/
├── app/
│   ├── (auth)/                    # 인증 페이지 (로그인/회원가입)
│   │   ├── log-in/
│   │   └── create-account/
│   ├── (tabs)/                    # 주요 탭 네비게이션 라우트 그룹
│   │   ├── (home)/                # 홈 피드
│   │   ├── search/                # 키워드 검색
│   │   ├── tweets/[id]/           # 트윗 상세 보기 및 수정
│   │   ├── users/[username]/      # 유저 프로필 페이지
│   │   └── settings/              # 환경설정 페이지
│   ├── api/                       # API 라우트
│   └── actions/                   # 테마 등 UI 관련 서버 액션
├── components/
│   ├── auth/                      # 로그인/회원가입 UI
│   ├── tweet/                     # 트윗 카드 및 입력창
│   ├── response/                  # 댓글 UI
│   ├── search/                    # 검색 입력 및 결과
│   ├── profile/                   # 프로필 수정/미리보기
│   ├── common/                    # 공통 버튼, 로딩 등
│   └── layout/                    # 헤더, 탭바 등 레이아웃 컴포넌트
├── lib/                           # 공통 유틸리티 및 설정
│   ├── db.ts                      # Prisma DB 연결
│   ├── session.ts                 # 세션 처리
│   ├── auth.ts                    # iron-session 기반 인증 핸들러
│   └── constants.ts               # 상수 및 유효성 규칙
├── types/                         # 커스텀 타입 및 인터페이스
└── prisma/                        # Prisma 스키마 및 마이그레이션
```

## 🎯 주요 구현 특징

### 🔄 최적화된 사용자 경험

- **낙관적 업데이트**: 좋아요, 댓글 등 즉시 반영으로 반응성 극대화
- **스켈레톤 로딩**: 콘텐츠 로딩 중 자연스러운 플레이스홀더
- **실시간 폼 검증**: 사용자 입력에 대한 즉각적인 피드백

### 🔒 보안 & 성능

- **서버사이드 세션**: 클라이언트 노출 없는 안전한 인증
- **권한 기반 접근 제어**: 소유자만 수정/삭제 가능
- **SQL 인젝션 방지**: Prisma ORM을 통한 안전한 쿼리
- **Next.js 캐싱**: 자동 최적화된 데이터 페칭

### 🎨 독창적인 디자인

- **레트로 테마**: Press Start 2P 폰트와 픽셀 아트 감성
- **일관된 디자인 시스템**: 재사용 가능한 컴포넌트 아키텍처
