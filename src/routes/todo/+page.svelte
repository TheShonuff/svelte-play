<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { dataset_dev } from 'svelte/internal';

	console.log($page.data);
	console.log('-----');
	console.log($page.status);

	let indexCount = 0;
	let index = 0;
	$: max = $page.data.parsedTasks.length;
	console.log(`parsed tasks is ${max} long`);
	function handleCount() {
		if (indexCount < max - 1) {
			indexCount++;
			console.log(indexCount);
		} else {
			alert('max limit');
		}
	}
</script>

<h1>Tasks List</h1>
<div>
	<form
		method="POST"
		action="?/add"
		use:enhance={({ form }) => {
			form.reset();
			console.log('form submitted');
		}}
	>
		<input id="new-task" name="todo" type="text" placeholder="New Task" />
		<button>Add</button>
		{#each $page.data.parsedTasks as task, index}
			<div>
				<form class="task" method="POST" action="?/delete" use:enhance>
					<p>{task.name}</p>
					<input hidden name="id" type="text" value={task.name} />
					<input hidden name="index" type="text" value={index} />
					<button>delete</button>
				</form>
			</div>
		{/each}
	</form>
</div>

<h1>Tasks Scroll</h1>
<div>
	<h1>{$page.data.parsedTasks[indexCount].name}</h1>
	<h2>There are {max} tasks</h2>
	<button on:click={handleCount}>Click</button>
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
