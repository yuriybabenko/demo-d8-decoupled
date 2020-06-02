declare var require: any

import { useState } from 'react';

var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Parent component representing the table.
 */
function NodeList() {
    const [didLoad, setDidLoad] = useState(false);
    const [nodes, setNodes] = useState([]);

    if (!didLoad) {
        var fetch = require('whatwg-fetch');

        fetch.fetch('/api/nodes').then((response) => {
            setDidLoad(true);
            return response.json();
        }).then((json) => {
            setNodes(json.data);
        }).catch((ex) => {
            console.log('Parsing failed.', ex)
        })
    }

    // If there are any issues getting the data, backend will return an
    // empty JSON object.
    if (!nodes) {
        return (
            <div className="error">
                No nodes available.
            </div>
        );
    }

    // Table header.
    var header = (
        <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Title</th>
        </tr>
    );

    // Table rows are composed of NodeRow components. Node and
    // index are passed as props.
    var rows = nodes.map((row, index) => {
        return (<NodeRow node={row} key={row.id} />);
    });

    return (
        <div id="properties">
            <h1>Nodes</h1>
            <table id="properties-list">
                <thead>{ header }</thead>
                <tbody>{ rows }</tbody>
            </table>
        </div>
    );
}

/**
 * Child component representing an individual row in the NodeList parent.
 */
function NodeRow(props) {
    const [node, setPropertyData] = useState(props.node);

    return (
        <tr key={ node.id + '-tr' }>
            <td>{ node.id }</td>
            <td>{ node.type }</td>
            <td>{ node.attributes.title }</td>
        </tr>
    );
}

ReactDOM.render(<NodeList />, document.getElementById('root'));