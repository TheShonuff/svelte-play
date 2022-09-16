<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { savedTasks } from '$lib/store';
	import { reload } from '$lib/store';

	/** @type {import('./$types').PageData}*/
	export let data;
	/** @type {import('./$types').ActionData}*/
	export let form;
	console.log("What's currently in the store:");
	console.log('-------------');
	console.log($savedTasks);
	console.log('-------------');

	$: TODO = data.parsedNewTasks;
	// Prints all the data in fron the server load function into console.
	console.log($page.data);
</script>

<p>Hello from layout.server.js my num is: {$page.data.a}</p>

{#if $page.data.user === false}
	<p>The user is not logged in</p>
{:else}
	<p>The user is logged in</p>
{/if}

<h1>Corona Statistics</h1>
<p><b>my num is: </b>{data.myNum}</p>
<h2>{data.result.data[0].region.province}</h2>
<p><b>confirmed: </b>{data.result.data[0].confirmed}</p>

<h2>Vaccines</h2>
<p><b>Total Cases: </b>{data.vac[0].TotalTests}</p>

<!-- defined in page.server.js POST method calls upon actions object speak and runs speak -->

{#if form?.Push_success}
	<p>success</p>
	<h3>{form.a}</h3>
{:else}
	<form method="POST" action="?/speak" use:enhance>
		<button>push</button>
	</form>
{/if}

<div>
	{#if form?.Press_success}
		<p>{form.name}</p>
		<p>Name:</p>
	{/if}
	<form method="POST" action="?/press" use:enhance>
		<input name="name" type="text" />
		<button>press</button>
	</form>
</div>

<form method="POST" action="?/done" use:enhance>
	<button>Done</button>
</form>

<!-- layout.Server.js loads mongodb query. Passed to page.js unpacked to "todos" in page.svelte then list each todo in an each loop -->
<div>
	<h3>Tasks</h3>
	<form method="POST" action="?/add" use:enhance>
		<input name="todo" type="text" />
		<button>Add</button>
	</form>
	{#each TODO as todo, index}
		<div class="tasks">
			<form class="task" method="POST" action="?/delete" use:enhance>
				<p>{todo.name}</p>
				<p>index: <b>{index}</b></p>
				<input hidden name="id" type="text" value={todo.name} />
				<inpit hidden name="index" type="text" value={index} />
				<button>delete</button>
			</form>
		</div>
	{/each}
</div>

<hr />

<!-- A Test with $Page.data-->
<div>
	<h3>$Tasks</h3>
	<form method="POST" action="?/add" use:enhance>
		<input name="todo" type="text" />
		<button>Add</button>
		{#each $page.data.parsedNewTasks as todo, index}
			<div class="tasks">
				<form class="task" method="POST" action="?/delete" use:enhance>
					<p>{todo.name}</p>
					<p>index: <b>{index}</b></p>
					<input hidden name="id" type="text" value={todo.name} />
					<inpit hidden name="index" type="text" value={index} />
					<button>delete</button>
				</form>
			</div>
		{/each}
	</form>
</div>

<style>
	.task {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 500px;
		height: 45px;
		background-color: lightblue;
		margin-bottom: 2px;
	}
</style>
