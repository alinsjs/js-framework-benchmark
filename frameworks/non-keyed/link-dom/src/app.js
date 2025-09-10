

/*
 * @Author: chenzhongsheng
 * @Date: 2023-08-10 16:07:29
 * @Description: Coding something
 */
import {buildData} from './data';
import {collectRef, mount, dom, Dom, find} from 'link-dom';

let selected = -1;
let rows = [];

let refs = {
    list: dom.div.text(''),
}

function appendData(data){
    const node = dom.frag;
    node.append(
        data.map(SingleChild)
    )
    refs.list.append(node);
}

function add () {
    const data = buildData()
    rows.push(...data);
    appendData(data);
}

function remove (id) {
    rows.splice(
        rows.findIndex((d) => d.id === id),
        1
    );
    refs.list.find('#list-item-'+id).remove();
}

function select (id) {
    selected = id;
    try{
        refs.list.find('.danger').removeClass('danger');
    }catch(e){
        console.log('danger not exist');
    }
    refs.list.find('#list-item-'+id).addClass('danger');
}

function run () {
    refs.list.empty();
    rows = buildData();
    selected = -1;
    appendData(rows);
}


function update () {
    const n = rows.length;
    for (let i = 0; i < n; i += 10) {
        rows[i].label += ' !!!';
        modifyDataLabel(i);
    }
}

function runLots () {
    refs.list.empty();
    rows = buildData(10000);
    selected = -1;
    appendData(rows);
}

function clear () {
    rows = [];
    selected = -1;
    refs.list.empty();
}

function swapRows () {
    if (rows.length > 998) {
        const d1 = rows[1];
        rows[1] = rows[998];
        rows[998] = d1;

        modifyData(1);
        modifyData(998)
    }
}

const modifyData = (index) => {
    const newData = rows[index];
    const node = refs.list.child(index);
    node.class(newData.id === selected ? 'danger': '');
    node.attr('data-label', newData.label);
    node.child(0).child(0).text(newData.id);
    const selectNode = node.child(1).child(0)
    selectNode.el._replace_click(()=>{select(newData.id)});
    selectNode.text(newData.label);
    node.child(2).child(0).el._replace_click(()=>{remove(newData.id)});
}

const modifyDataLabel = (index) => {
    const newData = rows[index];
    const node = refs.list.child(index);
    node.attr('data-label', newData.label);
    node.child(1).child(0).text(newData.label);
}

const SingleChild = ($item) => {

    const selectItem = ()=>{
        const el = dom.a.append(
            dom.span.text($item.label)
        );
        let fn = () => {
            select($item.id)
        }
        el.el.addEventListener('click', ()=>{fn()});
        el.el._replace_click = (newFn)=>{ fn = newFn; };
        return el;
    }
    const removeItem = ()=>{
        const el = dom.a.append(
            dom.span.class('glyphicon glyphicon-remove').attr('aria-hidden', 'true')
        )
        let fn = () => remove($item.id)
        el.el.addEventListener('click', ()=>{fn()});
        el.el._replace_click = (newFn)=>{ fn = newFn; };
        return el;
    }

    return dom.tr.id('list-item-'+$item.id).class($item.id === selected ? 'danger': '')
        .attr('data-label', $item.label)
        .append(
            dom.td.class('col-md-1').append(
                dom.span.text($item.id)
            ),
            dom.td.class('col-md-4').append(selectItem()),
            dom.td.class('col-md-1').append(removeItem()),
            dom.td.class('col-md-6')
        )
}

const App = ()=>{

    refs = collectRef('list');
    return dom.div.append(
        dom.div.class('jumbotron').append(
            dom.div.class('row').append(
                dom.div.class('col-md-6').append(
                    dom.h1.text('LinkDom (Non keyed)')
                ),
                dom.div.class('col-md-6').append(
                    dom.div.class('row').append(
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').class('btn btn-primary btn-block').id('run').click(run).append(
                                dom.text('Create 1,000 rows')
                            )
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').class('btn btn-primary btn-block').id('runlots').click(runLots).append(
                                dom.text('Create 10,000 rows')
                            )
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').class('btn btn-primary btn-block').id('add').click(add).append(
                                dom.text('Append 1,000 rows')
                            )
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').class('btn btn-primary btn-block').id('update').click(update).append(
                                dom.text('Update every 10th row')
                            )
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').class('btn btn-primary btn-block').id('clear').click(clear).append(
                                dom.text('Clear')
                            )
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').class('btn btn-primary btn-block').id('swaprows').click(swapRows).append(
                                dom.text('Swap Rows')
                            )
                        )
                    )
                )
            )
        ),
        dom.table.class('table table-hover table-striped test-data').append(
            dom.tbody.ref(refs.list).append(
                rows.map(SingleChild)
            )
        ),
        dom.span.class('preloadicon glyphicon glyphicon-remove').attr('aria-hidden', 'true')
    )
}

mount(App(), 'body')