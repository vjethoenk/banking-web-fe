Hãy setup hoàn chỉnh hệ thống Authentication + Authorization cho dự án ReactJS hiện tại.

## 1. Tech stack

Project sử dụng:

- ReactJS
- TypeScript
- Vite
- React Router DOM
- Axios
- Zustand
- TailwindCSS
- Backend Spring Boot REST API
- Authentication sử dụng JWT

Hãy ưu tiên kiến trúc Feature-based, clean, dễ mở rộng và phù hợp với production.

Không tạo code thừa và không over-engineering.

==================================================
2. CẤU TRÚC FOLDER
==================================================

Tổ chức code theo cấu trúc:

src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── layouts/
│
├── components/
│   ├── ui/
│   └── common/
│       ├── ProtectedRoute.tsx
│       ├── RoleRoute.tsx
│       ├── Loading.tsx
│       └── ErrorBoundary.tsx
│
├── features/
│   └── auth/
│       ├── api/
│       │   └── auth.api.ts
│       ├── components/
│       │   └── LoginForm.tsx
│       ├── hooks/
│       │   ├── useLogin.ts
│       │   └── useLogout.ts
│       ├── stores/
│       │   └── auth.store.ts
│       ├── types/
│       │   └── auth.types.ts
│       └── index.ts
│
├── services/
│   └── api/
│       ├── client.ts
│       ├── interceptors.ts
│       └── api.types.ts
│
├── constants/
│   ├── routes.ts
│   └── storageKeys.ts
│
├── hooks/
├── stores/
├── types/
├── utils/
├── config/
└── main.tsx

Nếu project hiện tại đã có cấu trúc thì KHÔNG được xóa code cũ.
Hãy tích hợp vào cấu trúc hiện tại và chỉ tạo thêm những file cần thiết.

==================================================
3. GLOBAL API RESPONSE
==================================================

Backend Spring Boot sử dụng response format thống nhất:

{
    "code": 1000,
    "message": "Success",
    "result": {}
}

Trong đó:

- code: number
- message: string
- result: dữ liệu trả về, có thể là object, array hoặc null

Hãy tạo type generic:

ApiResponse<T>

Ví dụ:

export interface ApiResponse<T> {
    code: number;
    message: string;
    result: T;
}

Cho phép:

ApiResponse<User>
ApiResponse<User[]>
ApiResponse<LoginResponse>
ApiResponse<null>

==================================================
4. AXIOS GLOBAL API CLIENT
==================================================

Tạo một Axios instance duy nhất:

services/api/client.ts

Ví dụ:

axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

Không được gọi axios trực tiếp trong component.

Toàn bộ API phải sử dụng:

apiClient

==================================================
5. GLOBAL REQUEST INTERCEPTOR
==================================================

Tạo request interceptor.

Mỗi request tự động lấy access token từ:

localStorage

Storage key:

access_token

Nếu có token thì tự động thêm:

Authorization: Bearer <token>

Không được yêu cầu từng API tự truyền Authorization.

Ví dụ:

apiClient.get("/accounts")

phải tự động trở thành:

Authorization: Bearer eyJ...

==================================================
6. GLOBAL RESPONSE INTERCEPTOR
==================================================

Tạo global response interceptor để xử lý response:

{
    "code": 1000,
    "message": "Success",
    "result": {}
}

Quy tắc:

- HTTP 2xx:
    trả về ApiResponse<T>

- HTTP 401:
    xử lý authentication error

- HTTP 403:
    xử lý forbidden

- HTTP 404:
    xử lý not found

- HTTP 500:
    xử lý server error

Không được để component phải tự kiểm tra:

response.data.code

ở mọi nơi.

Ví dụ không muốn:

const response = await loginApi(data);

if (response.data.code !== 1000) {
    ...
}

Hãy tạo một cơ chế global để xử lý thống nhất.

==================================================
7. API ERROR TYPE
==================================================

Tạo kiểu lỗi dùng chung:

ApiError

Ví dụ:

export interface ApiError {
    code: number;
    message: string;
    result: null;
}

Khi backend trả:

{
    "code": 1001,
    "message": "Username or password is incorrect",
    "result": null
}

Frontend phải có thể lấy được:

error.message

và:

error.code

Không để mỗi feature phải tự parse AxiosError.

==================================================
8. AUTH LOGIN
==================================================

Tạo:

features/auth/api/auth.api.ts

Login API:

POST /auth/login

Request:

{
    "username": "...",
    "password": "..."
}

Backend trả:

{
    "code": 1000,
    "message": "Login successfully",
    "result": {
        "accessToken": "...",
        "refreshToken": "...",
        "user": {
            "id": "...",
            "username": "...",
            "email": "...",
            "roles": [
                "CUSTOMER"
            ]
        }
    }
}

Hãy tạo:

LoginRequest
LoginResponse

và:

loginApi()

==================================================
9. ZUSTAND AUTH STORE
==================================================

Tạo:

features/auth/stores/auth.store.ts

State:

- accessToken
- refreshToken
- user
- isAuthenticated

Methods:

- login()
- logout()
- setUser()
- setAccessToken()
- clearAuth()

Khi login thành công:

1. Lưu accessToken
2. Lưu refreshToken nếu backend trả về
3. Lưu user
4. Update Zustand state
5. isAuthenticated = true

==================================================
10. STORAGE
==================================================

Tạo:

constants/storageKeys.ts

export const STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user"
} as const;

Không hard-code các key này ở nhiều nơi.

==================================================
11. RELOAD KHÔNG MẤT LOGIN
==================================================

Khi browser reload:

F5

React/Zustand state sẽ bị reset.

Do đó auth.store phải initialize state từ localStorage.

Nếu:

localStorage.getItem("access_token")

có giá trị thì:

isAuthenticated = true

và restore user.

Sau reload:

/dashboard

vẫn truy cập được nếu token còn tồn tại.

==================================================
12. PROTECTED ROUTE
==================================================

Tạo:

components/common/ProtectedRoute.tsx

ProtectedRoute kiểm tra:

isAuthenticated

Nếu false:

Navigate đến:

/login

Nếu true:

render Outlet

Ví dụ:

/dashboard
/accounts
/transfer
/transactions

đều phải được bảo vệ.

==================================================
13. ROLE BASED ROUTE
==================================================

Tạo:

components/common/RoleRoute.tsx

Nhận:

allowedRoles: string[]

Ví dụ:

<RoleRoute allowedRoles={["ADMIN"]} />

User phải có ít nhất một role phù hợp.

Nếu không có quyền:

Navigate đến:

/403

Ví dụ:

ADMIN có thể truy cập:

/admin/users
/admin/roles
/admin/permissions

CUSTOMER không được truy cập các trang trên.

==================================================
14. ROUTER
==================================================

Tổ chức router theo:

Public routes:

/login
/register
/forgot-password

Protected routes:

/dashboard
/accounts
/transfer
/transactions

Admin routes:

/admin/users
/admin/roles
/admin/permissions

Cấu trúc:

Public Route
    ↓
ProtectedRoute
    ↓
RoleRoute
    ↓
Page

==================================================
15. LOGOUT
==================================================

Khi logout:

- Xóa accessToken
- Xóa refreshToken
- Xóa user
- Clear Zustand auth state
- Navigate về /login

Sau logout:

Không được truy cập lại protected route bằng browser history.

==================================================
16. REFRESH TOKEN
==================================================

Nếu backend hỗ trợ refresh token, hãy setup:

Access Token
    ↓
expired
    ↓
API trả 401
    ↓
Axios response interceptor
    ↓
POST /auth/refresh
    ↓
nhận accessToken mới
    ↓
lưu accessToken mới
    ↓
retry request cũ

Nếu chưa có refresh API trong backend thì:

- Không tự tạo API giả
- Chuẩn bị kiến trúc để sau này dễ thêm
- Hiện tại khi nhận 401 thì logout và redirect /login

==================================================
17. CHỐNG MULTIPLE REFRESH REQUEST
==================================================

Nếu implement refresh token:

Không được để nhiều API cùng lúc nhận 401 rồi gọi refresh token nhiều lần.

Ví dụ:

GET /accounts → 401
GET /transactions → 401
GET /profile → 401

Chỉ được phép:

POST /auth/refresh

một lần.

Các request khác phải chờ refresh hoàn thành rồi retry.

Sử dụng cơ chế:

isRefreshing
failedQueue

hoặc một cơ chế tương đương.

==================================================
18. AUTH ERROR
==================================================

Global error handling phải hỗ trợ:

401:
"Phiên đăng nhập đã hết hạn"

403:
"Bạn không có quyền truy cập"

404:
"Không tìm thấy tài nguyên"

500:
"Hệ thống đang gặp sự cố"

Nếu backend trả message cụ thể thì ưu tiên sử dụng:

response.message

thay vì hard-code frontend.

==================================================
19. QUAN TRỌNG: KHÔNG PHÂN QUYỀN CHỈ Ở FRONTEND
==================================================

Frontend RoleRoute chỉ có tác dụng bảo vệ UI và navigation.

Backend Spring Security vẫn phải kiểm tra:

Authentication
Authorization
Role
Permission

Frontend không được coi role trong localStorage là nguồn bảo mật tuyệt đối.

==================================================
20. API USAGE MONG MUỐN
==================================================

Sau khi setup xong, feature khác chỉ cần:

const response = await getAccounts();

Không cần:

axios
localStorage
Authorization header
response.data.result
response.data.code

ở trong component.

Ví dụ API:

export const getAccounts = async (): Promise<Account[]> => {
    const response = await apiClient.get<ApiResponse<Account[]>>(
        "/accounts"
    );

    return response.data.result;
};

Component:

const accounts = await getAccounts();

==================================================
21. QUY TẮC CODE
==================================================

- TypeScript strict
- Không dùng any nếu không cần thiết
- Không duplicate Axios instance
- Không gọi axios trực tiếp trong component
- Không hard-code token key
- Không hard-code API URL
- Không parse API response ở component
- Không duplicate error handling
- Không duplicate Authorization header
- Không dùng Zustand để lưu toàn bộ server state
- Không tạo abstraction không cần thiết
- Ưu tiên code dễ đọc và dễ maintain
- Tách rõ UI / business logic / API / state
- Sử dụng alias @/ nếu project hỗ trợ
- Không phá vỡ code hiện tại

==================================================
22. ENV
==================================================

Tạo hoặc cập nhật:

.env

VITE_API_URL=http://localhost:8080/api/v1

Không hard-code:

http://localhost:8080

trong source code.

==================================================
23. OUTPUT YÊU CẦU
==================================================

Hãy triển khai trực tiếp vào project hiện tại.

Sau khi code xong, hãy trả lời:

1. Những file đã tạo
2. Những file đã sửa
3. Cấu trúc authentication flow
4. Cấu trúc authorization flow
5. Cấu trúc global API response
6. Cách login
7. Cách logout
8. Cách reload không mất token
9. Cách ProtectedRoute hoạt động
10. Cách RoleRoute hoạt động
11. Cách xử lý 401/403
12. Cách thêm API mới theo chuẩn

Đặc biệt hãy đảm bảo toàn bộ API đều thống nhất với response:

{
    "code": 1000,
    "message": "...",
    "result": {}
}

và frontend không phải tự xử lý format response này ở từng component.