import{_ as f,c as i,a as t,b as n,w as d,u as k,T as w,t as o,e as h,F as u,r as p,o as a,d as g,R as _,i as I,f as y,v as C,p as S,g as b}from"./index-B9AzGg62.js";const H=e=>(S("data-v-247b78ac"),e=e(),b(),e),N={class:"container"},D={key:0},L={class:"btnGame"},B={class:"game"},M={key:0},P=H(()=>t("div",null,"Speed Clicking",-1)),T={key:1},V={class:"stats"},$={class:"lives"},E={class:"spaces"},F=["id","onClick"],O={key:2},R={key:0};let j=window.innerHeight-75,A=window.innerWidth-75,m=null,v=null,r=null;const G={data(){return{gameon:"start",dc:Number(localStorage.getItem("dc"))||0,dc_t:Number(localStorage.getItem("dc_t"))||0,highclck:Number(localStorage.getItem("highclck"))||0,highgametime:Number(localStorage.getItem("highgametime"))||0,gametime:0,clck:0,life:3,spcLast:300,spcInt:150,spcCur:0,newH:!1,space:[{id:0,show:!1,value:0},{id:1,show:!1,value:0},{id:2,show:!1,value:0},{id:3,show:!1,value:0},{id:4,show:!1,value:0}]}},methods:{play:function(){this.dc-1>=0&&(this.dc_t>0&&(this.dc_t--,localStorage.setItem("dc_t",this.dc_t)),this.gameon="playing",this.newH=!1,this.dc--,localStorage.setItem("dc",this.dc),this.gametime=0,this.life=3,this.clck=0,this.spcLast=300,this.spcInt=200,this.spcCur=0,this.space=[{id:0,show:!1,value:0},{id:1,show:!1,value:0},{id:2,show:!1,value:0},{id:3,show:!1,value:0},{id:4,show:!1,value:0}],this.interval())},interval:function(){r=setInterval(()=>{this.gametime+=10,this.spcCur+=10,this.spcCur>=this.spcInt&&(this.show_spc(),this.spcCur=0,this.spcInt>=52&&(this.spcInt-=2));for(let e=0;e<=this.space.length-1;e++)this.space[e].show===!0&&(this.space[e].value>0?this.space[e].value-=10:(this.space[e].show=!1,this.life--,this.life<1&&(clearInterval(r),this.gameon="over",this.checkHigh())))},100)},show_spc:function(){for(let e=0;e<=this.space.length-1;e++)if(this.space[e].show===!1){this.space[e].value=this.spcLast,this.spcLast-=1,m=Math.floor(Math.random()*A),v=Math.floor(Math.random()*j),document.getElementById("spc"+e).style.top=v+"px",document.getElementById("spc"+e).style.left=m+"px",this.space[e].show=!0;break}},click:function(e){console.log(this.spcInt),this.space[e].show=!1,this.clck++},voidclick:function(){this.life--,this.life<1&&(this.gameon="over",clearInterval(r),this.checkHigh())},checkHigh:function(){this.clck>this.highclck&&(this.highclck=this.clck,this.newH=!0,localStorage.setItem("highclck",this.highclck),localStorage.setItem("highgametime",this.highgametime))}},mounted(){}},W=Object.assign(G,{__name:"SC",setup(e){return(s,c)=>(a(),i("div",N,[s.gameon!="playing"?(a(),i("div",D,[t("nav",L,[n(k(_),{to:"/"},{default:d(()=>[g("DS")]),_:1})]),n(w,null,{stat:d(()=>[g(o(s.dc),1)]),icon:d(()=>[n(I)]),_:1}),t("div",null,"Highcore: "+o(s.highclck),1)])):h("",!0),t("div",B,[s.gameon==="start"?(a(),i("div",M,[P,t("button",{class:"btnPlay",onClick:c[0]||(c[0]=l=>s.play())},"Play (1DC)")])):h("",!0),s.gameon==="playing"?(a(),i("div",T,[t("div",{class:"back",onClick:c[1]||(c[1]=l=>s.voidclick())}),t("div",V,[(a(!0),i(u,null,p(s.life,l=>(a(),i("div",$,"O"))),256)),t("div",null,"| Score: "+o(s.clck),1)]),t("div",E,[(a(!0),i(u,null,p(s.space,l=>y((a(),i("div",{class:"space",id:"spc"+l.id,onClick:q=>s.click(l.id)},o(s.space[l.id].value),9,F)),[[C,l.show]])),256))])])):s.gameon==="over"?(a(),i("div",O,[t("button",{class:"btnPlay",onClick:c[2]||(c[2]=l=>s.play())},"Play Again (1DC)"),t("div",null,"Time: "+o(s.gametime/100)+"s",1),t("div",null,"Clicks: "+o(s.clck),1),s.newH?(a(),i("div",R,"New highscore!")):h("",!0)])):h("",!0)])]))}}),J=f(W,[["__scopeId","data-v-247b78ac"]]);export{J as default};
