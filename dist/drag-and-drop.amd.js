var M=Object.defineProperty;var y=(o,c,u)=>c in o?M(o,c,{enumerable:!0,configurable:!0,writable:!0,value:u}):o[c]=u;var w=(o,c,u)=>(y(o,typeof c!="symbol"?c+"":c,u),u);/**
  * vue-cal v4.8.1
  * (c) 2024 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */define(["exports"],function(o){"use strict";let u=null,d=null,h={id:null,date:null},f=!1,m=!0,s={el:null,cell:null,timeout:null};const n={_eid:null,fromVueCal:null,toVueCal:null},D=class{constructor(t){w(this,"_vuecal");this._vuecal=t}_getEventStart(t){const{timeStep:e,timeCellHeight:l,timeFrom:a,utils:r}=this._vuecal;let{y:i}=r.cell.getPosition(t);return i-=t.dataTransfer.getData("cursor-grab-at")*1,Math.round(i*e/parseInt(l)+a)}_updateEventStartEnd(t,e,l,a){const r=l.duration*1||e.endTimeMinutes-e.startTimeMinutes;let i=Math.max(this._getEventStart(t),0);if(this._vuecal.snapToTime){const g=i+this._vuecal.snapToTime/2;i=g-g%this._vuecal.snapToTime}e.startTimeMinutes=i,e.start=new Date(new Date(a).setMinutes(i)),e.endTimeMinutes=Math.min(i+r,24*60),e.end=new Date(new Date(a).setMinutes(e.endTimeMinutes))}eventDragStart(t,e){if(t.target.nodeType===3)return t.preventDefault();t.dataTransfer.dropEffect="move",t.dataTransfer.setData("event",JSON.stringify(e)),t.dataTransfer.setData("cursor-grab-at",t.offsetY);const{clickHoldAnEvent:l}=this._vuecal.domEvents;setTimeout(()=>{l._eid=null,clearTimeout(l.timeoutId),e.deleting=!1},0),this._vuecal.domEvents.dragAnEvent._eid=e._eid,n._eid=e._eid,n.fromVueCal=this._vuecal._.uid,e.dragging=!0,setTimeout(()=>e.draggingStatic=!0,0),f=!1,h={id:this._vuecal.view.id,date:this._vuecal.view.startDate},m=!0}eventDragEnd(t){this._vuecal.domEvents.dragAnEvent._eid=null,n._eid=null,t.dragging=!1,t.draggingStatic=!1;const{fromVueCal:e,toVueCal:l}=n;l&&e!==l&&this._vuecal.utils.event.deleteAnEvent(t),n.fromVueCal=null,n.toVueCal=null,f&&m&&h.id&&this._vuecal.switchView(h.id,h.date,!0)}cellDragEnter(t,e,l){const a=t.currentTarget;if(!t.currentTarget.contains(t.relatedTarget)){if(a===s.el||!a.className.includes("vuecal__cell-content"))return!1;s.el&&(s.cell.highlighted=!1),s={el:a,cell:e,timeout:clearTimeout(s.timeout)},e.highlighted=!0,["years","year","month"].includes(this._vuecal.view.id)&&(s.timeout=setTimeout(()=>this._vuecal.switchToNarrowerView(l),2e3))}}cellDragOver(t,e,l,a){t.preventDefault(),e.highlighted=!0,(a||a===0)&&(e.highlightedSplit=a)}cellDragLeave(t,e){t.preventDefault(),!t.currentTarget.contains(t.relatedTarget)&&(e.highlightedSplit=!1,s.cell===e&&(clearTimeout(s.timeout),s={el:null,cell:null,timeout:null},e.highlighted=!1))}cellDragDrop(t,e,l,a){t.preventDefault(),clearTimeout(s.timeout),s={el:null,cell:null,timeout:null};const r=JSON.parse(t.dataTransfer.getData("event")||"{}");let i,g;if(n.fromVueCal!==this._vuecal._.uid){const{_eid:v,start:S,end:V,duration:T,...C}=r;i=this._vuecal.utils.event.createAnEvent(l,T,{...C,split:a})}else if(i=this._vuecal.view.events.find(v=>v._eid===n._eid),i||(i=this._vuecal.mutableEvents.find(v=>v._eid===n._eid),g=!!i),!i){const v=r.endTimeMinutes-r.startTimeMinutes,{start:S,end:V,...T}=r;i=this._vuecal.utils.event.createAnEvent(l,v,{...T,split:a})}const{start:E,split:p}=i;this._updateEventStartEnd(t,i,r,l),g&&this._vuecal.addEventsToView([i]),i.dragging=!1,(a||a===0)&&(i.split=a),e.highlighted=!1,e.highlightedSplit=null,m=!1,n.toVueCal=this._vuecal._.uid;const _={event:this._vuecal.cleanupEvent(i),oldDate:E,newDate:i.start,...(a||a===0)&&{oldSplit:p,newSplit:a},originalEvent:this._vuecal.cleanupEvent(r),external:!n.fromVueCal};this._vuecal.$emit("event-drop",_),this._vuecal.$emit("event-change",{event:_.event,originalEvent:_.originalEvent}),setTimeout(()=>{n._eid&&this.eventDragEnd(i)},300)}viewSelectorDragEnter(t,e,l){t.currentTarget.contains(t.relatedTarget)||(l.highlightedControl=e,clearTimeout(u),u=setTimeout(()=>{if(["previous","next"].includes(e))this._vuecal[e](),clearInterval(d),d=setInterval(this._vuecal[e],800);else if(e==="today"){clearInterval(d);let a;this._vuecal.view.id.includes("year")&&(a=this._vuecal.enabledViews.filter(r=>!r.includes("year"))[0]),this._vuecal.switchView(a||this._vuecal.view.id,new Date(new Date().setHours(0,0,0,0)),!0)}else this._vuecal.switchView(e,null,!0);f=!0},800))}viewSelectorDragLeave(t,e,l){t.currentTarget.contains(t.relatedTarget)||l.highlightedControl===e&&(l.highlightedControl=null,u&&(u=clearTimeout(u)),d&&(d=clearInterval(d)))}};o.DragAndDrop=D,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
