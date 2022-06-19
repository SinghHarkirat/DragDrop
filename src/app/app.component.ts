import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'DragDrop';
  dropAreaVal:any;
  @ViewChildren('nums') nums:QueryList<ElementRef> | undefined;
  numbers:any[]=[];
  ngOnInit(): void {
   this.numbers=[
      {id:1,val:55},
      {id:2,val:60},
      {id:3,val:20},
      {id:4,val:45}
    ];
    console.log(document.querySelectorAll(".nums"));
  }
  ngAfterViewInit(): void {
   var items=this.nums?.toArray().map((el)=>el.nativeElement);
   var dragEl:any=null;
   items?.forEach((item)=>{
    item.addEventListener('dragstart',(e:any)=> this.handleDragStart(e));
    item.addEventListener('dragenter',(e:any)=>this.handleDragEnter(e));
    item.addEventListener('dragover',(e:any)=>this.handleDragOver(e));
    item.addEventListener('dragleave',(e:any)=>this.handleDragLeave(e));
    item.addEventListener('drop',(e:any)=>this.handleDrop(e));
    item.addEventListener('dragend',(e:any)=>this.handleDragEnd(e));
   })
    
  }

  handleDragStart(event:any){
    var dragEl=event.target;
    console.log('drag started');
    dragEl.classList.add('drag');
    event.dataTransfer.effectAllowed='move';
    event.dataTransfer.setData('text',event.target.innerText);
  }
   handleDragEnter(event:any){
    var dragEl=event.target;
    console.log('drag enter id',dragEl.id);
    dragEl.classList.remove('drag');
    dragEl.classList.add('over');
  }
   handleDragOver(event:any){
    event.preventDefault();
    var dropEl=event.target;
    console.log('drag over',dropEl.id);
    event.dataTransfer.dropEffect='move';
   
  }
   handleDragLeave(event:any){
    var dragEl=event.target;
    dragEl.classList.remove('over');
    console.log('drag leaved');
  }
   handleDrop(event:any){
   
    event.preventDefault();
   
    var dropArea=event.target;
    console.log('dropped at',dropArea);
    dropArea.classList.remove('over');
    let data= event.dataTransfer.getData('text');
    console.log('data',data);
   // let numbers=AppComponent.
    this.dropAreaVal=dropArea.id;
    console.log('dropAreaVal',this.dropAreaVal);
    if(this.numbers.findIndex((x:any)=>x.id==dropArea.id)!=-1)
    {
      let dropIndex=this.numbers.findIndex((x:any)=>x.id==dropArea.id);
      let dragIndex=this.numbers.findIndex((x:any)=>x.val==data);
      let arrayWithDragElem=this.numbers.splice(dragIndex,1);
      this.numbers.splice(dropIndex,0,arrayWithDragElem[0]);
    
    }
     

  }
   handleDragEnd(event:any){
    var dragEl=event.target;
    console.log('drag end',dragEl.id);
    dragEl.classList.remove('drag');
    this.numbers=this.numbers.filter((x)=>x.id!==this.dropAreaVal);
  }
 
 
  
  
}
