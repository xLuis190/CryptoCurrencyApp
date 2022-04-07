
M.AutoInit()
Vue.component('card',{
    props: ['currencies'],
    
    template:`
    <div>
    <div  v-for="currency in currencies.Data" class="crd" >
            <h3>
                <img :src="'https://cryptocompare.com'+currency.CoinInfo.ImageUrl" alt="">
                {{currency.CoinInfo.FullName}} ({{currency.CoinInfo.Name}})
            </h3>
            <h6>Price: {{Math.round((currency.RAW.USD.PRICE*100)) /100}} 
                <p style="color:red" v-if="currency.RAW.USD.CHANGEPCT24HOUR < 0"> {{Math.round((currency.RAW.USD.CHANGEPCT24HOUR *100) ) /100 }}% <i  class="fas fa-arrow-down" ></i></p>
               <p style="color:green" v-else>{{Math.round((currency.RAW.USD.CHANGEPCT24HOUR *100) ) /100 }}% <i  class="fas fa-arrow-up" > </i> </p>
             </h6>
             <a  :href="'https://cryptocompare.com'+currency.CoinInfo.Url" class="btn blue" target='_blank' >Full Price change</a>
        </div>
        </div>
    `
})
new Vue({
    el: "#root",
    data() {
        return {
            currencies: [],
        }
    },
    mounted(){
        this.getData()
    },
     methods: {
        getData(){
            axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=52&tsym=USD').then(
            response => {
                
                this.currencies = response.data
                console.log(this.currencies[0])
            })
        },
    },

})
