<template>
  <div style="display:flex">
    <div v-for="cloth in filteredClothes" :key="cloth.id" class="mainDiv" >
      <router-link :to="{ name: 'Cloth', params: { id: cloth.id } }">
    <h2 class="hover-underline-animation">{{ cloth.title }}</h2>
    <img class="clthimg" :src="cloth.image" :alt="cloth.title">
  </router-link>
  

    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const filteredClothes = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:5000/clothes");
        filteredClothes.value = response.data;
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    });

    return { filteredClothes };
  }
};
</script>
<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Kristi&display=swap');


.clthimg {
width: 85%;
border-radius: 5px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
a{
  text-decoration:none;
    color:gray;
    font-family: 'Kristi', cursive;
      font-size: 44px;
}
.mainDiv{
  padding: 2rem;


}
.hover-underline-animation {
width: min-content;
  position: relative;
  color: gray;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>