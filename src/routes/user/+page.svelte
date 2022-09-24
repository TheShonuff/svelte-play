<script>
	import { loggedIN } from '$lib/store';
	console.log($loggedIN);
</script>

<h1>I'm the user page</h1>
<p>Current login status: {$loggedIN}</p>
