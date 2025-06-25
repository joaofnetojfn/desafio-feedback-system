<template>
  <div
    id="login"
    class="min-h-screen bg-gray-100 flex items-center justify-center padding-20"
  >
    <div class="w-full max-w-md">
      <!-- Card de Login -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-blue-600 text-white text-center py-4 px-6">
          <h1 class="text-xl font-semibold">Sistema de Feedback</h1>
        </div>

        <!-- Form -->
        <div class="p-6">
          <form @submit.prevent="handleLogin">
            <div class="mb-6">
              <label
                for="username"
                class="block text-sm font-medium text-gray-600 mb-2"
              >
                Nome de usuário
              </label>
              <div class="relative padding-20 formatter-input-login">
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="Exemplo: ana.costa"
                  class="padding-20 w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :class="{ 'border-red-500': error }"
                  required
                />
              </div>
              <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
            </div>
            <div class="padding-20">
              <button
                type="submit"
                :disabled="loading || !username.trim()"
                class="btn-margin-top w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white formatter-loading-20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
                <span v-else>ENTRAR</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Usuários de Teste -->
      <div class="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-sm font-medium text-gray-600 mb-4">
          Usuários disponíveis para teste:
        </h2>
        <div class="space-y-2">
          <div v-if="testUsersLoading" class="text-gray-400 text-sm">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white formatter-loading-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Carregando usuários...
          </div>
          <div v-else-if="!testUsersLoading && testUsers.length === 0">
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              Nenhum colaborador encontrado
            </h3>
          </div>
          <div v-else class="formatter-list-user-test">
            <div
              v-for="user in testUsers"
              :key="user.username"
              @click="selectTestUser(user.username)"
              class="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <span class="text-sm text-gray-700">
                {{ user.name }} ({{ user.username }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import axios from "axios";

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string; // corrigido para string, pois é UUID
    username: string;
    name: string;
  };
}

export default defineComponent({
  name: "LoginPage",
  setup(_, { root }) {
    const username = ref<string>("");
    const loading = ref<boolean>(false);
    const error = ref<string>("");

    const testUsers = ref<string[]>([]);
    const testUsersLoading = ref<boolean>(false);

    const fetchTestUsers = async () => {
      testUsersLoading.value = true;
      try {
        const response = await api.get("/collaborators");
        testUsers.value = response.data.map((user: any) => ({
          username: user.username,
          name: user.name,
        }));

        // testUsers.value = response.data.map((user: any) => user.username);
      } catch (err) {
        console.error("Erro ao buscar usuários para teste:", err);
      } finally {
        testUsersLoading.value = false;
      }
    };

    // Corrigido baseURL para o backend raiz
    const api = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const handleLogin = async (): Promise<void> => {
      if (!username.value.trim()) {
        error.value = "Nome de usuário é obrigatório";
        return;
      }

      loading.value = true;
      error.value = "";

      try {
        const response = await api.post<LoginResponse>("/auth/login", {
          username: username.value.trim(),
        });

        if (response.data.success) {
          // Salvar dados do usuário no localStorage ou store
          localStorage.setItem("user", JSON.stringify(response.data.user));

          // Redirecionar para a página de colaboradores
          root.$router.push("/colaboradores");
        } else {
          error.value = response.data.message || "Erro ao fazer login";
        }
      } catch (err: any) {
        console.error("Erro no login:", err);

        if (err.response?.status === 401) {
          error.value = "Usuário não encontrado";
        } else if (err.response?.status === 500) {
          error.value = "Erro interno do servidor";
        } else if (err.code === "ECONNABORTED") {
          error.value = "Tempo limite excedido";
        } else {
          error.value = "Erro de conexão. Tente novamente.";
        }
      } finally {
        loading.value = false;
      }
    };

    const selectTestUser = (user: string): void => {
      username.value = user;
      error.value = "";
    };

    onMounted(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        root.$router.push("/colaboradores");
      } else {
        fetchTestUsers();
      }
    });

    return {
      username,
      loading,
      error,
      testUsers,
      testUsersLoading,
      handleLogin,
      selectTestUser,
    };
  },
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
.btn-margin-top {
  margin-top: 10px;
}
.padding-20 {
  padding: 20px;
}
.formatter-input-login {
  display: flex;
}
.formatter-loading-20 {
  width: 20px;
  margin-right: 5px;
}
.formatter-list-user-test {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: flex-end;
  align-items: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
