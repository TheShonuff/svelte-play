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

	function increaseCount() {
		if (indexCount < max - 1) {
			indexCount++;
			console.log(indexCount);
		} else {
			alert('max limit');
		}
	}
	function decreaseCount() {
		if (indexCount > 0) {
			indexCount--;
		} else {
			alert('zero reached');
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
<hr />
<hr />

<h3>Tasks Scroll</h3>
<div>
	<h1>There are {max} tasks</h1>
	<h2>{$page.data.parsedTasks[indexCount].name}</h2>
	<h4>{$page.data.parsedTasks[indexCount].status}</h4>

	<form class="status" method="POST" action="?/update" use:enhance>
		<input hidden name="id" type="text" value={$page.data.parsedTasks[indexCount].name} />
		<input hidden name="status" type="text" value={$page.data.parsedTasks[indexCount].status} />
		<button>Change Status</button>
	</form>
	<button on:click={decreaseCount}>Previous</button>
	<button on:click={increaseCount}>Next</button>
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
