<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	console.log($page.data);
</script>

<h1>Tasks</h1>
<div>
	<form method="POST" action="?/add" use:enhance>
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
