<template>
  <div class="table-container">
    <table class="app-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="row.id || index"
        >
          <td
            v-for="column in columns"
            :key="column.key"
          >
            {{ row[column.key] }}
          </td>
        </tr>

        <tr v-if="rows.length === 0">
          <td
            :colspan="columns.length"
            class="empty-message"
          >
            Aucun élément à afficher
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },

  rows: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

.app-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.app-table th,
.app-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.app-table th {
  background-color: #f8fafc;
  color: #1e293b;
  font-weight: 600;
}

.app-table tbody tr:hover {
  background-color: #f8fafc;
}

.app-table tbody tr:last-child td {
  border-bottom: none;
}

.empty-message {
  text-align: center;
  color: #64748b;
  padding: 25px;
}
</style>