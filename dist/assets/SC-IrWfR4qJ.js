import{c as i,a as t,b as n,w as d,u as f,T as k,t as o,e as h,F as u,r as g,o as a,d as m,R as w,i as _,f as y,v as I}from"./index-CBhuLXxC.js";const C={class:"container"},S={key:0},b={class:"btnGame"},H={class:"game"},N={key:0},D=t("div",null,"Speed Clicking",-1),L={key:1},B={class:"stats"},M={class:"lives"},P={class:"spaces"},T=["id","onClick"],V={key:2},$={key:0};let E=window.innerHeight-75,F=window.innerWidth-75,p=null,v=null,r=null;const O={data(){return{gameon:"start",dc:Number(localStorage.getItem("dc"))||0,dc_t:Number(localStorage.getItem("dc_t"))||0,highclck:Number(localStorage.getItem("highclck"))||0,highgametime:Number(localStorage.getItem("highgametime"))||0,gametime:0,clck:0,life:3,spcLast:300,spcInt:150,spcCur:0,newH:!1,space:[{id:0,show:!1,value:0},{id:1,show:!1,value:0},{id:2,show:!1,value:0},{id:3,show:!1,value:0},{id:4,show:!1,value:0}]}},methods:{play:function(){this.dc-1>=0&&(this.dc_t>0&&(this.dc_t--,localStorage.setItem("dc_t",this.dc_t)),this.gameon="playing",this.newH=!1,this.dc--,localStorage.setItem("dc",this.dc),this.gametime=0,this.life=3,this.clck=0,this.spcLast=300,this.spcInt=200,this.spcCur=0,this.space=[{id:0,show:!1,value:0},{id:1,show:!1,value:0},{id:2,show:!1,value:0},{id:3,show:!1,value:0},{id:4,show:!1,value:0}],this.interval())},interval:function(){r=setInterval(()=>{this.gametime+=10,this.spcCur+=10,this.spcCur>=this.spcInt&&(this.show_spc(),this.spcCur=0,this.spcInt>=52&&(this.spcInt-=2));for(let e=0;e<=this.space.length-1;e++)this.space[e].show===!0&&(this.space[e].value>0?this.space[e].value-=10:(this.space[e].show=!1,this.life--,this.life<1&&(clearInterval(r),this.gameon="over",this.checkHigh())))},100)},show_spc:function(){for(let e=0;e<=this.space.length-1;e++)if(this.space[e].show===!1){this.space[e].value=this.spcLast,this.spcLast-=1,p=Math.floor(Math.random()*F),v=Math.floor(Math.random()*E),document.getElementById("spc"+e).style.top=v+"px",document.getElementById("spc"+e).style.left=p+"px",this.space[e].show=!0;break}},click:function(e){console.log(this.spcInt),this.space[e].show=!1,this.clck++},voidclick:function(){this.life--,this.life<1&&(this.gameon="over",clearInterval(r),this.checkHigh())},checkHigh:function(){this.clck>this.highclck&&(this.highclck=this.clck,this.newH=!0,localStorage.setItem("highclck",this.highclck),localStorage.setItem("highgametime",this.highgametime))}},mounted(){}},A=Object.assign(O,{__name:"SC",setup(e){return(s,c)=>(a(),i("div",C,[s.gameon!="playing"?(a(),i("div",S,[t("nav",b,[n(f(w),{to:"/"},{default:d(()=>[m("DS")]),_:1})]),n(k,null,{stat:d(()=>[m(o(s.dc),1)]),icon:d(()=>[n(_)]),_:1}),t("div",null,"Highcore: "+o(s.highclck),1)])):h("",!0),t("div",H,[s.gameon==="start"?(a(),i("div",N,[D,t("button",{class:"btnPlay",onClick:c[0]||(c[0]=l=>s.play())},"Play (1DC)")])):h("",!0),s.gameon==="playing"?(a(),i("div",L,[t("div",{class:"back",onClick:c[1]||(c[1]=l=>s.voidclick())}),t("div",B,[(a(!0),i(u,null,g(s.life,l=>(a(),i("div",M,"O"))),256)),t("div",null,"| Score: "+o(s.clck),1)]),t("div",P,[(a(!0),i(u,null,g(s.space,l=>y((a(),i("div",{class:"space",id:"spc"+l.id,onClick:R=>s.click(l.id)},o(s.space[l.id].value),9,T)),[[I,l.show]])),256))])])):s.gameon==="over"?(a(),i("div",V,[t("button",{class:"btnPlay",onClick:c[2]||(c[2]=l=>s.play())},"Play Again (1DC)"),t("div",null,"Time: "+o(s.gametime/100)+"s",1),t("div",null,"Clicks: "+o(s.clck),1),s.newH?(a(),i("div",$,"New highscore!")):h("",!0)])):h("",!0)])]))}});export{A as default};
