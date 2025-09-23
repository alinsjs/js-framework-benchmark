

/*
 * @Author: chenzhongsheng
 * @Date: 2023-08-10 16:07:29
 * @Description: Coding something
 */
import {buildData} from './data';
// import {LinkDom} from './core.iife.min';

const { mount, dom, raw, ctrl, ref} = window.Core;

let selected = ref(-1);
let rows = ref([], false);

function setRows(update = rows.value.slice()) {
    debugger;
  rows.value = update
}

function add() {
  rows.value = rows.value.concat(buildData(1000))
}

function remove(id) {
  rows.value.splice(
    rows.value.findIndex((d) => d.id === id),
    1
  )
  setRows()
}

function run() {
  setRows(buildData())
  selected.value = undefined
}

function update() {
  const _rows = rows.value
  for (let i = 0; i < _rows.length; i += 10) {
    _rows[i].label += ' !!!'
  }
  setRows()
}

function runLots() {
  setRows(buildData(10000))
  selected.value = undefined
}

function clear() {
  setRows([])
  selected.value = undefined
}

function swapRows() {
  const _rows = rows.value
  if (_rows.length > 998) {
    const d1 = _rows[1]
    const d998 = _rows[998]
    _rows[1] = d998
    _rows[998] = d1
    setRows()
  }
}

const App = ()=>{

    return dom.div.append(
        dom.div.class('jumbotron').append(
            dom.div.class('row').append(
                dom.div.class('col-md-6').append(
                    dom.h1.text('LinkDom3 (Non keyed)')
                ),
                dom.div.class('col-md-6').append(
                    dom.div.class('row').append(
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').text('Create 1,000 rows')
                                .class('btn btn-primary btn-block').id('run').click(run)
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').text('Create 10,000 rows')
                                .class('btn btn-primary btn-block').id('runlots').click(runLots)
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').text('Append 1,000 rows')
                                .class('btn btn-primary btn-block').id('add').click(add)
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').text('Update every 10th row')
                                .class('btn btn-primary btn-block').id('update').click(update)
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').text('Clear')
                                .class('btn btn-primary btn-block').id('clear').click(clear)
                        ),
                        dom.div.class('col-sm-6 smallpad').append(
                            dom.button.type('button').text('Swap Rows')
                                .class('btn btn-primary btn-block').id('swaprows').click(swapRows)
                        )
                    )
                )
            )
        ),
        dom.table.class('table table-hover table-striped test-data').append(
            dom.tbody.append(
                ctrl.for(rows, (item)=>{
                    return dom.tr.id(()=>'list-item-'+item.id).class(()=>(item.id === selected.value ? 'danger': ''))
                        .attr('data-label', () => item.label)
                        .append(
                            dom.td.class('col-md-1').append(
                                dom.span.text(()=>item.id)
                            ),
                            dom.td.class('col-md-4').click(()=>{
                                selected.value = item.id;
                            }).append(dom.a.append(
                                dom.span.text(()=>item.label)
                            )),
                            dom.td.class('col-md-1').append(
                                dom.a.append(
                                    dom.span.class('glyphicon glyphicon-remove').attr('aria-hidden', 'true').click(()=>{
                                        remove(item.id);
                                    })
                                )
                            ),
                            dom.td.class('col-md-6')
                        )
                })
            )
        ),
        dom.span.class('preloadicon glyphicon glyphicon-remove').attr('aria-hidden', 'true')
    )
}

mount(App(), 'body')