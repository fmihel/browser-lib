import scriptLoader from "./scriptLoader";

export  namespace ut{
  /**
   * событие на изменение маршрута броузера ( в пределах страницы )
  */
  export function onChangeLocation(callback:Function):void;  
  export function random(min:number,max:number):number;
  export function random_str(count:number):string;
  export function replaceAll(str:string, search:string, replaceTo:string):string;
  export function get(...args):any;
   /**
   * Возврат команды по ее алиасу(короткому описанию)
   * Ex: alias('direct',{direction:'direct'}) => direction
   * Ex: alias('direct',{direction:['direct','dir','d']}) => direction
   * Ex: alias('d',{direction:['direct','dir','d']}) => direction
   * Ex: alias('left',{direction:['direct','dir','d'],right:['r','noLeft']}) => left
   * Ex: alias('r',{direction:['direct','dir','d'],right:['r','noLeft']}) => right
   * @returns {string|Exception} full name of command
   */
  export function alias(alias:string,conform:object):string;
  /**
  * перебор по элементам или свойствам
   * При переборе по объекту в ф-цию func передается 5 параметра
   * ( значение свойства, имя свойства, весь объект, порядковый номер,список свойств )
   * @return {any} результа поиска
    */
  export function each(o:any[]|object, func:Function):any;
  export function translate(y:number, y1:number, y2:number, x1:number, x2:number):number;
   /**
     * Последовательное выполнение цепочки промисов заданных массивом funcs
     * @param {Function[]} funcs - массив функций
     * @param {any} param - параметр, передаваемый в первый промис
     * @returns {Promise}
     */
  export function promises(funcs:Function[], param?:any):Promise;
    /** преобразует value в boolean
     * @param {any}
     * @returns {boolean}
     * Ex:
     * toBool(true) = true
     * toBool(0) = false
     * toBool(1) = false
     * toBool(null) = false
     * toBool(undefined) = false
     * toBool("1 ") = true
     * toBool(" true") = true
     * toBool("lkdw") = false
     * toBool(false) = false
    */
  export function toBool(value:any):boolean;
  /** сравнение переменных
     * При совпадении типов - строгое сравнение, 
     * при string & number строку приводим к числу,
     * true = 1,false = 0  true === '1' && false === '0'
     * NaN = undefined = null !==0  !==false !==''
    */
   export function eq(val1:any,val2:any):boolean;
   /** приведение к bool и сравнение с true */
   export function True(val:any):boolean;
   /** приведение к bool и сравнение с true */
   export function False(val:any):boolean;
}

export function DOM(selector:string, _parentDOM?:object):object;
export function DOMS(selector:string, _parentDOM?:object):object;
export function $D(...p):object;
export function parentDOM(selector:string, _parentDOM?:object):object;
export function childDOM(selector:string, _parentDOM?:object):object;

export interface iDevice{
  os:string;
  platform:string;
  mobile:boolean;
  isIE:boolean;
  browserName:string;
  chromium:boolean;
  overallness:string;
} 

export const dvc:iDevice;

interface iCoord{x:number,y:number};
interface iSize{x:number,y:number,w:number,h:number};

export namespace JX {
  /**jQuery object*/
  export const window:object; 
  /** координаты мыши 
   * @returns {iCoord} {x,y}
  */
  export function mouse():iCoord;
  
  /** размер экрана броузера
   * @returns {iSize} {x,y,w,h}
  */
  export function screen():iSize;
  /** определяет позицию DOM элемента относительно родительского */
  export function pos(dom:object,bound?:iCoord=undefined);
  /** определяет позицию DOM элемента относительно окна броузера */
  export function abs(dom:object,bound?:iCoord=undefined);
  /** видимость dom 
   * visible(dom) - возвращает видим ли dom
   * visible(dom,'deep') возвращает видим ли dom анализируя видимость и родительских элементов
   * visible(dom,false) устанваливает dom.style.display = 'none'
   * visible(dom,true) устанваливает dom.style.display = 'block'
   * visible(dom,true,'table') устанваливает dom.style.display = 'table' 
  */
  export function visible(dom:object,param:any,visibleMean:string):boolean;
 
  /** коллекция объектов JQ, если нет объекта, будет создан
    * при запросе пыьается найти уже созданный, если его не существует или,
    * ранее созданный length = 0 , пыьается его создать.
    * Объекты можно группировать посредством указания группы param.group
    * без указания группы объекты помещаются в группу `common`
    * Ex:
    * JX.$('body');    аналогично JX.$('body',{group:'common'}); )
    * JX.$('#txt'); не аналогично JX.$('#txt',{group:'anyGroup'}),
    * хотя возвращаемые объекты  будет ссылаться на один и тот же DOM
  */  
  export function $(selector:string,param?:object):object;
  
  /** длина текста в пикселях */
  export function textSize(text:string, param?:object):iSize;
 
  /** проверка актуальности объекта jQuery
   *  если, хотябы один объект dom содержащийся в коллекции
   *  $obj не содержится в дереве документа, то считаем
   *  что $obj неактулен, и скорее всего его нужно перестроить 
   */
  export function relevance($obj:object):boolean;
   
  /** скролирует объект scroll:DOM до момента, пока to:DOM не окажется в области видимости */
  export function scroll(scroll:object,to:object,param?:object={});
}; 

export namespace storage{
  export function get(name:string,param?:object={}):string;
  export function set(name:string,val:any,param?:object={}):void;
  export function exist(name:string,param?:object={}):boolean;
  export function del(name:string,param?:object={}):void;
}

export function flex(prop:string):object;
export function binds(_this:object,...funcName:string):void;

class Promise{
  then(func:Function):Promise
  catch(func:Function):Promise;
}

class ScriptLoader{
  /** возвращает признак, что загружен скрипт
  * @param {string} addr of scripts
  * @returns {bool}
  */
  exist(url:string):boolean;
  /** @returns {number} count of loading script */
  count():number;
  /** return name loading script by index
  * @param {int} index
  * @returns {string}
  */
  get(i:number):string;
    /** динамическая загрузка js скрипта
     * @param {string|object} string = "addr" object = {url:"addr"}
     * @param {string} - имя глобальной переменной в загружаемом скрипте, которая будет возвращена в случае удачи
     * @returns {Promise}
    */
  load(url:string|object,varName?:string):Promise;
}
export const scriptLoader:ScriptLoader;

export class Url{
    static href():string;
    static current():string;
    static params(url:string, set?:boolean = false, replace?:boolean= false):object;
    static parsing(url:string):object;
    static extFileName(file:string):string;
    static extPath(file:string):string;
    static nocache(url:string):string;
}

export function imports(...names:string):Promise;
