# 5urf Twitter

사용자들이 생각과 순간을 공유할 수 있는 소셜 미디어 플랫폼입니다.

## 주요 기능

- 사용자 인증 (회원가입, 로그인, 로그아웃)
- 트윗 작성, 수정, 삭제
- 트윗에 좋아요 및 댓글 기능
- 사용자 프로필 보기 및 수정
- 트윗 및 사용자명 검색 기능
- 다크모드 지원 (라이트/다크 테마 전환)

## 기술 스택

### 프론트엔드

- **Next.js 15**
- **TypeScript**
- **TailwindCSS**

### 백엔드

- **Next.js API Routes & Server Actions**
- **Prisma**
- **iron-session**
- **bcryptjs**
- **Zod**

## 프로젝트 구조

```
app/
├── (auth)/
├── (tabs)/
│   ├── (home)/
│   ├── search/
│   ├── tweets/
│   └── users/
components/
lib/
prisma/
```
