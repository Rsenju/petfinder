Refatorar sistema de dados respeitando estrutura atual.

⚠️ Não criar nova estrutura.
⚠️ Trabalhar dentro das pastas existentes:

* src/data
* src/api
* src/utils
* src/hooks

---

# 1️⃣ src/data/mockData.js

Transformar em fonte central de dados:

Exportar:

* ongs
* pets
* funções auxiliares:

  * getOngById
  * getPetsByOng
  * getFilteredOngs
  * getFilteredPets

Não colocar lógica de React aqui.

---

# 2️⃣ src/api/ongs.js

Implementar:

* fetchOngs(filters)
* fetchOngById(id)

Essas funções devem:

* Simular delay
* Usar mockData
* Retornar Promise

---

# 3️⃣ src/api/pets.js

Implementar:

* fetchPets(filters)
* fetchPetById(id)
* fetchPetsByOng(ongId)

---

# 4️⃣ Hooks

`useOngs.js`

* Usar React Query
* Consumir api/ongs.js

`usePets.js`

* Usar React Query
* Consumir api/pets.js

---

# ⚠️ Regras importantes

* Página nunca acessa mockData direto
* Página nunca chama fetch direto
* Hook chama API
* API usa mockData
* mockData é fonte estática

Fluxo correto:

Page → Hook → API → MockData

---

Código organizado.
Sem criar pastas novas.
Sem quebrar imports existentes.
Manter padrão arquitetural do projeto.
