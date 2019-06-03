// html demo
$('#html').jstree();

// inline data demo
$('#data').jstree({
	core: {
		data: [{ text: 'Root node', children: [{ text: 'Child node 1' }, { text: 'Child node 2' }] }],
	},
});

// data format demo
$('#frmt').jstree({
	core: {
		data: [
			{
				text: 'Root node',
				state: { opened: true },
				children: [
					{
						text: 'Child node 1',
						state: { selected: true },
						icon: 'jstree-file',
					},
					{ text: 'Child node 2', state: { disabled: true } },
				],
			},
		],
	},
});

// ajax demo
$('#ajax').jstree({
	core: {
		data: {
			url: './root.json',
			dataType: 'json', // needed only if you do not supply JSON headers
		},
	},
});

var checkboxLst = [];
// lazy demo
$('#lazy')
	.on('changed.jstree', function(e, data) {
		console.log('data', data);
		if (data.selected.length) {
			$('#lazy li.jstree-node').each(function() {
				if (data.node.li_attr.type !== this.type) {
					$('#lazy').jstree('disable_node', this.id);
				}
			});
			console.log('The selected node is: ' + data.instance);
		} else {
			$('#lazy li.jstree-node').each(function() {
				if (data.node.li_attr.type !== this.type) {
					$('#lazy').jstree('enable_node', this.id);
				}
			});
		}
	})
	.jstree({
		checkbox: {
			keep_selected_style: false,
		},
		plugins: ['checkbox', 'changed'],
		core: {
			data: {
				// url: 'https://www.jstree.com/fiddle/?lazy',
				url: './root.json',
				dataType: 'json',
				data: function(node) {
					return { id: node.id };
				},
			},
		},
	});

// data from callback
$('#clbk').jstree({
	core: {
		data: function(node, cb) {
			if (node.id === '#') {
				cb([{ text: 'Root', id: '1', children: true }]);
			} else {
				cb(['Child']);
			}
		},
	},
});

// interaction and events
$('#evts_button').on('click', function() {
	var instance = $('#evts').jstree(true);
	instance.deselect_all();
	instance.select_node('1');
});
$('#evts')
	.on('changed.jstree', function(e, data) {
		if (data.selected.length) {
			alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
		}
	})
	.jstree({
		core: {
			multiple: false,
			data: [{ text: 'Root node', children: [{ text: 'Child node 1', id: 1 }, { text: 'Child node 2' }] }],
		},
	});
