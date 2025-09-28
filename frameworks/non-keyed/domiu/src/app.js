

/*
 * @Author: chenzhongsheng
 * @Date: 2023-08-10 16:07:29
 * @Description: Coding something
 */
// import { mount, dom, raw, ctrl, ref } from '../../packages/core/src';
import { buildData } from './data';
// import {LinkDom} from './core.iife.min';

const { mount, dom, raw, ctrl, ref} = window.Core;

const selected = ref(-1);
const rows = ref([]);

window.rows = rows;

function add () {
    const data = buildData();
    rows.value.push(...data);
}

function remove (id) {
    rows.value.splice(
        rows.value.findIndex((d) => d.id === id),
        1
    );
}

function run () {
    rows.value = buildData();
    selected.value = -1;
}


function update () {
    const arr = rows.value;
    const n = arr.length;
    for (let i = 0; i < n; i += 10) {
        arr[i].label += ' !!!';
    }
}

function runLots () {
    rows.value = buildData(10000);
    selected.value = -1;
}

function clear () {
    rows.value = [];
    selected.value = -1;
}

function swapRows () {
    const arr = rows.value;
    debugger;
    if (arr.length > 998) {
        const d1 = raw(arr[1]);
        debugger;
        arr[1] = arr[998];
        arr[998] = d1;
    }
}

const App = () => {
    return dom.div([
        dom.div({ class: 'jumbotron' }, [
            dom.div({ class: 'row' }, [
                dom.div({ class: 'col-md-6' }, [
                    dom.h1('Domiu (Non keyed)')
                ]),
                dom.div({ class: 'col-md-6' }, [
                    dom.div({ class: 'row' }, [
                        dom.div({ class: 'col-sm-6 smallpad' }, [
                            dom.button({
                                attr: { type: 'button' },
                                class: 'btn btn-primary btn-block',
                                id: 'run',
                                click: run,
                                text: 'Create 1,000 rows'
                            }),
                            dom.button({
                                attr: { type: 'button' },
                                class: 'btn btn-primary btn-block',
                                id: 'runlots',
                                click: runLots,
                                text: 'Create 10,000 rows'
                            }),
                            dom.button({
                                attr: { type: 'button' },
                                class: 'btn btn-primary btn-block',
                                id: 'add',
                                click: add,
                                text: 'Append 1,000 rows'
                            }),
                            dom.button({
                                attr: { type: 'button' },
                                class: 'btn btn-primary btn-block',
                                id: 'update',
                                click: update,
                                text: 'Update every 10th row'
                            }),
                            dom.button({
                                attr: { type: 'button' },
                                class: 'btn btn-primary btn-block',
                                id: 'clear',
                                click: clear,
                                text: 'Clear'
                            }),
                            dom.button({
                                attr: { type: 'button' },
                                class: 'btn btn-primary btn-block',
                                id: 'swaprows',
                                click: swapRows,
                                text: 'Swap Rows'
                            })
                        ])
                    ])
                ])
            ])
        ]),
        dom.table({ class: 'table table-hover table-striped test-data' }, [
            dom.tbody([
                ctrl.for(rows, (item) => {
                    return dom.tr({
                        id: () => 'list-item-' + item.id,
                        class: () => (item.id === selected.value ? 'danger' : '')
                    }, [
                        dom.td({ class: 'col-md-1' }, [
                            dom.span({ text: () => item.id })
                        ]),
                        dom.td({ class: 'col-md-4', click: () => { selected.value = item.id;} }, [
                            dom.a([ dom.span({ text: () => item.label }) ])
                        ]),
                        dom.td({ class: 'col-md-1' }, [
                            dom.a([
                                dom.span({ 
                                    class: 'glyphicon glyphicon-remove', 
                                    attr: { 'aria-hidden': 'true' },
                                    click: () => { remove(item.id); }
                                })
                            ])
                        ]),
                        dom.td({ class: 'col-md-6' })
                    ]);

                })
            ])
        ]),
        dom.span({ class: 'preloadicon glyphicon glyphicon-remove', attr: { 'aria-hidden': 'true' } })
    ]);
};

mount(App(), 'body');