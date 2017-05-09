var Store = {
  state: {
    sharedChosenData: {
      step_one: { data: '' },
      step_two: { data: '' }
    }
  }
};

// 1. Define route components.
// These can be imported from other files
var StepOneComponent = Vue.extend({
  template: '#step-one',
  data: function() {
    return {
      step_one_items: ['param one', 'param two'],
      shared: Store.state
    }
  }
});

var StepTwoComponent = Vue.extend({
  template: '#step-two',
  beforeRouteEnter: function(to, from, next) {
    if (from.name === 'step_one') {
      if(Store.state.sharedChosenData.step_one.data === '') {
        return;
      }
      else {
        next();
      }
    }
  },
  data: function() {
    return {
      step_two_items: ['param one', 'param two', 'param three'],
      shared: Store.state
    }
  }
});

var SharedData = Vue.extend({
  template: '#shared-data',
  data: function() {
    return {
      shared: Store.state
    }
  }
});

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
var routes = [
  { path: '/step_one',
    name: 'step_one',
    // a single route can define multiple named components
    // which will be rendered into <router-view>s with corresponding names.
    components: {
      default: StepOneComponent,
      sharedData: SharedData
    }
  },
  {
    path: '/step_two',
    name: 'step_two',
    components: {
      default: StepTwoComponent,
      sharedData: SharedData
    }
  }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
  routes: routes
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
var app = new Vue({
    router: router,
    el: '#app',
    data: {
      currentView: StepOneComponent
    }
  });

app.currentView = StepOneComponent;

/*
 var dinoEdit = {
 template: "#dino-edit",
 props: ["name", "initialQuantity"],
 data: function() {
 this.$emit('increment', this.initialQuantity);
 return {
 quantity: this.initialQuantity
 }
 },
 methods: {
 increment: function() {
 this.quantity += 1;
 this.$emit('increment', 1);
 }
 }
 };
 var dinoShow = {
 template: '#dino-show',
 props: ["name", "diet"]
 };
 var card = new Vue({
 el: "#card",
 data: {
 title: "Style Bindings",
 input: "",
 currentView: "dino-show",
 total: 0,
 checked: false,
 chosenDino: '',
 selectedPeriods: [],
 single: '',
 message: '',
 amount: null,
 isRounded: false,
 sizeToggle: false,
 disabled: false,
 backgroundColor: '#CCCCCC',
 frontColor: "#000000",
 range: 50,
 items: [
 { text: 'Tyrannosaurus', quantity: 5, diet: 'Carnivore' },
 { text: 'Triceratops', quantity: 4, diet: 'Herbivore'},
 { text: 'Stegosaurus', quantity: 6, diet: 'Herbivore'}
 ],
 periods: [
 { name: 'Triassic', value: 1 },
 { name: 'Jurassic', value: 2 },
 { name: 'Cretaceous', value: 3 }
 ]
 },
 watch: {
 input: _.debounce(function() {
 this.buttonText = this.input !== "" ? "Add " + this.input : "Add Dinosaur"
 }, 250)
 },
 methods: {
 addDinos: function() {
 this.total += this.amount;
 /!*var input = document.getElementById('itemForm');

 if(input.value !== '') {
 this.items.push({
 name: input.value,
 quantity: 5
 });

 input.value = '';
 }*!/
 },
 deleteItem: function(index) {
 this.items.slice(index, 1);
 },
 increaseQuantity: function(index) {
 this.items[index].quantity += 1;
 },
 decreaseQuantity: function(index) {
 this.items[index].quantity -= 1;
 },
 incrementTotal: function(amount) {
 this.total += amount;
 },
 toggle: function() {
 this.currentView = this.currentView === 'dino-show' ? 'dino-edit' : 'dino-show';
 }
 },
 filters: {
 capitalize: function(value) {
 if(!value) return '';
 value = value.toString();
 return value.charAt(0).toUpperCase() + value.slice(1);
 },
 undercase: function(value) {
 if(!value) return '';
 value = value.toString();
 return value.toLowerCase();
 },
 url: function(value) {
 if(!value) return '';
 value = value.toString();
 return "https://en.wikipedia.org/wiki/" + value
 }
 },
 computed: {
 totalDinos: function() {
 this.dinosUpdated += 1;
 var sum = 0;
 var items = this.items;

 for(var i in items) {
 sum += items[i].quantity;
 }
 return sum;
 },
 totalSpecies: function() {
 this.speciesUpdated += 1;
 return this.items.length;
 },
 buttonDisabled: function() {
 return !this.input.length;
 },
 styles: function() {
 return {
 color: this.frontColor,
 background: this.backgroundColor,
 'margin-left': this.range + "%"
 }
 },
 toggleLabel: function() {
 return this.currentView === 'dino-show' ? 'Edit' : 'Show';
 }
 },
 components: {
 'dino-edit': dinoEdit,
 'dino-show': dinoShow
 },
 store: {
 debug: true,
 state: {
 message: 'Hello!'
 },
 setMessageAction: function(newValue) {
 this.debug && console.log('setMessageAction triggered with', newValue)
 this.state.message = newValue
 },
 clearMessageAction: function() {
 this.debug && console.log('clearMessageAction triggered')
 this.state.message = ''
 }
 }
 });*/

/*var Store = {
 debug: true,
 state: {
 count: 0
 },
 setMessageAction: function(newValue) {
 this.debug && console.log('setMessageAction triggered with', newValue);
 this.state.message = newValue;
 },
 clearMessageAction: function() {
 this.debug && console.log('clearMessageAction triggered');
 this.state.message = 'action B triggered';
 }
 };

 var User = {
 template: '<div class="user">' +
 '<h2>User {{ $route.params.id }}' +
 ', <label> {{ $data }} </label>' +
 '<button v-on:click="increment">+</button></h2>' +
 '<router-view></router-view>' +
 '</div>',
 data: function() {
 return {
 sharedData: {
 count: Store.state
 }
 }
 },
 methods: {
 increment: function() {
 this.sharedData.count += 1;
 }
 }
 };

 var UserHome = {template: '<div>Home</div>'};
 var UserProfile = {
 template: '<div>Profile</div>' +
 ', <label> {{ $data }} </label>'
 };
 var UserPosts = {template: '<div>Posts</div>'};

 var router = new VueRouter({
 routes: [
 {
 path: '/user/:id', component: User,
 children: [
 // UserHome will be rendered inside User's <router-view>
 // when /user/:id is matched
 {path: '', component: UserHome},

 // UserProfile will be rendered inside User's <router-view>
 // when /user/:id/profile is matched
 {path: 'profile', component: UserProfile},

 // UserPosts will be rendered inside User's <router-view>
 // when /user/:id/posts is matched
 {path: 'posts', component: UserPosts}
 ]
 }
 ]
 });

 var app = new Vue({router: router})
 .$mount('#app');*/
