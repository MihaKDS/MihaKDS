import{c as a,a as e,b as l,w as c,u as d,T as u,d as r,t as o,e as p,o as n,R as m,i as g}from"./index-CBhuLXxC.js";const k={class:"container"},b={class:"btnGame"},f=e("div",null,"Rock, paper, sccissors",-1),w=e("br",null,null,-1),_=e("br",null,null,-1),v=e("br",null,null,-1),y={key:0},S={key:1},C=e("p",null,"Choose: ",-1),N={key:2},I=e("br",null,null,-1),P={data(){return{gameon:"start",plres:"nicg",pcres:"nicg",res:"nic",dc:Number(localStorage.getItem("dc"))||0,dc_t:Number(localStorage.getItem("dc_t"))||0,score:JSON.parse(localStorage.getItem("score"))||{won:0,draw:0,lost:0,num:0}}},methods:{play:function(){console.log(this.dc_t),this.dc-1>=0&&(this.dc_t>0&&(this.dc_t--,localStorage.setItem("dc_t",this.dc_t)),this.gameon="playing",this.dc--,localStorage.setItem("dc",this.dc))},choise:function(h){let s=Math.floor(Math.random()*3+1);switch(console.log(s),h){case 1:if(s===1){this.score.draw+=1,this.plres="rock",this.pcres="rock",this.res="draw",this.gameon="resault";break}else if(s===2){this.score.lost+=1,this.plres="rock",this.pcres="paper",this.res="lost",this.gameon="resault",this.score.num-=.1;break}else if(s===3){this.score.won+=1,this.plres="rock",this.pcres="sccissors",this.res="won",this.gameon="resault",this.score.num+=1;break}break;case 2:if(s===1){this.score.won+=1,this.plres="paper",this.pcres="rock",this.res="won",this.gameon="resault",this.score.num+=1;break}else if(s===2){this.score.draw+=1,this.plres="paper",this.pcres="paper",this.res="draw",this.gameon="resault";break}else if(s===3){this.score.lost+=1,this.plres="paper",this.pcres="sccissors",this.res="lost",this.gameon="resault",this.score.num-=.1;break}break;case 3:if(s===1){this.score.lost+=1,this.plres="sccissors",this.pcres="rock",this.res="lost",this.gameon="resault",this.score.num-=.1;break}else if(s===2){this.score.won+=1,this.plres="sccissors",this.pcres="paper",this.res="won",this.gameon="resault",this.score.num+=1;break}else if(s===3){this.score.draw+=1,this.plres="sccissors",this.pcres="sccissors",this.res="draw",this.gameon="resault";break}break}localStorage.setItem("score",JSON.stringify(this.score))}},mounted(){}},$=Object.assign(P,{__name:"RPS",setup(h){return(s,t)=>(n(),a("div",k,[e("nav",b,[l(d(m),{to:"/"},{default:c(()=>[r("DS")]),_:1})]),f,l(u,null,{stat:c(()=>[r(o(s.dc),1)]),icon:c(()=>[l(g)]),_:1}),e("div",null,[r(" won:"+o(s.score.won),1),w,r(" draw:"+o(s.score.draw),1),_,r(" lost:"+o(s.score.lost),1),v,r(" score:"+o(s.score.num),1)]),s.gameon==="start"?(n(),a("div",y,[e("button",{onClick:t[0]||(t[0]=i=>s.play())},"Play rps 1DC")])):s.gameon==="playing"?(n(),a("div",S,[C,e("button",{onClick:t[1]||(t[1]=i=>s.choise(1))},"Rock"),e("button",{onClick:t[2]||(t[2]=i=>s.choise(2))},"Paper"),e("button",{onClick:t[3]||(t[3]=i=>s.choise(3))},"Sccissors")])):s.gameon==="resault"?(n(),a("div",N,[e("button",{onClick:t[4]||(t[4]=i=>s.play())},"Play again"),I,e("div",null,"Player: "+o(s.plres),1),e("div",null,"PC: "+o(s.pcres),1),e("h3",null,o(s.res),1)])):p("",!0)]))}});export{$ as default};
