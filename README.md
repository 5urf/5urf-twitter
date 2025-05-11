# 5urf Twitter

사용자들이 생각과 순간을 공유할 수 있는 플랫폼입니다.

## 기술 스택

### 프론트엔드

- Next.js 15
- TypeScript
- TailwindCSS

### 백엔드

- Next.js API Routes & Server Actions
- Prisma
- iron-session

## 기능

- 사용자 인증 (회원가입, 로그인, 로그아웃)
- 트윗 작성, 수정, 삭제
- 트윗에 좋아요 및 댓글 기능
- 사용자 프로필 보기 및 수정
- 트윗 검색 기능

## 구조

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
