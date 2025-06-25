<template>
  <div class="min-h-screen bg-gray-50 p-6 padding-20">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Colaboradores</h1>
      </div>

      <!-- Search Bar -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="p-6">
          <div class="relative padding-20">
            <input
              v-model="search"
              type="text"
              placeholder="Buscar colaborador"
              class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-hidden padding-20">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 padding-20">
              <tr>
                <th
                  class="text-center padding-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Avatar
                </th>
                <th
                  class="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  class="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cargo
                </th>
                <th
                  class="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Departamento
                </th>
                <th
                  class="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="collaborator in paginatedCollaborators"
                :key="collaborator.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="
                      collaborator.avatar ||
                      '/placeholder.svg?height=20&width=20'
                    "
                    :alt="`Avatar de ${collaborator.name}`"
                    class="avatar-formatter w-10 h-10 rounded-full object-cover"
                    @error="handleImageError"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ collaborator.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ collaborator.position }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ collaborator.department }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click="sendFeedback(collaborator)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    ENVIAR FEEDBACK
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div
            v-if="filteredCollaborators.length === 0"
            class="text-center py-12 padding-20"
          >
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              Nenhum colaborador encontrado
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros de busca.
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12 padding-20">
            <p class="mt-2 text-sm text-gray-500">
              Carregando colaboradores...
            </p>
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 padding-20"
        >
          <div class="flex items-center">
            <span class="text-sm text-gray-700 mr-2">Rows per page:</span>
            <select
              v-model="itemsPerPage"
              class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="2">2</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>

          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">
              {{ startIndex }}-{{ endIndex }} of
              {{ filteredCollaborators.length }}
            </span>

            <div class="flex space-x-1">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fas fa-arrow-left w-5 h-5"></i>
              </button>

              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fas fa-arrow-right w-5 h-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

interface Collaborator {
  id: string;
  username: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export default Vue.extend({
  name: "CollaboratorsList",
  data() {
    return {
      collaborators: [] as Collaborator[],
      search: "",
      loading: false,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredCollaborators(): Collaborator[] {
      const searchLower = this.search.toLowerCase();
      return this.collaborators.filter((c) =>
        c.name.toLowerCase().includes(searchLower)
      );
    },
    totalPages(): number {
      return Math.ceil(this.filteredCollaborators.length / this.itemsPerPage);
    },
    paginatedCollaborators(): Collaborator[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCollaborators.slice(start, end);
    },
    startIndex(): number {
      return this.filteredCollaborators.length === 0
        ? 0
        : (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endIndex(): number {
      const end = this.currentPage * this.itemsPerPage;
      return Math.min(end, this.filteredCollaborators.length);
    },
  },
  watch: {
    search() {
      this.currentPage = 1; // Reset to first page when searching
    },
    itemsPerPage() {
      this.currentPage = 1; // Reset to first page when changing items per page
    },
  },
  mounted() {
    this.fetchCollaborators();
  },
  methods: {
    async fetchCollaborators() {
      this.loading = true;
      try {
        const response = await axios.get<Collaborator[]>(
          "http://localhost:3000/collaborators"
        );
        this.collaborators = response.data;
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
        // Você pode adicionar uma notificação de erro aqui
      } finally {
        this.loading = false;
      }
    },

    sendFeedback(collaborator: Collaborator) {
      // Implementar navegação para página de feedback
      this.$router.push(`/feedback/${collaborator.id}`);
    },

    handleImageError(event: Event) {
      const target = event.target as HTMLImageElement;
      target.src = "/placeholder.svg?height=40&width=40";
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.avatar-formatter {
  width: 65px;
  height: 65px;
}
.padding-10 {
  padding: 10px;
}
.padding-20 {
  padding: 20px;
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
