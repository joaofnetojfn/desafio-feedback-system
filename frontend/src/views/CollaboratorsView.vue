<template>
  <CollaboratorsList />
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import CollaboratorsList from "@/components/CollaboratorsList.vue";

export default defineComponent({
  name: "CollaboratorsView",
  components: {
    CollaboratorsList,
  },
});
</script>
