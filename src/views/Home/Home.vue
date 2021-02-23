<template>
	<div class="home">
		<h1 class="title">Battle Calculator</h1>
		<div class="buttons">
			<a class="btn-primary mt-3" href="create.html">Commencer une<br />nouvelle partie</a>
		</div>

		<div class="scoreboard mt-5">
			<h2 class="text-uppercase">Top scores</h2>
			<table>
				<thead>
					<tr>
						<th>RANG</th>
						<th class="text-left">UTILISATEUR</th>
						<th>SCORE</th>
						<th>DATE</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td><b>#1</b></td>
						<td class="text-left">Kristen</td>
						<td>23</td>
						<td>Hier</td>
					</tr>
					<tr>
						<td><b>#2</b></td>
						<td class="text-left">Nathan</td>
						<td>20</td>
						<td>Hier</td>
					</tr>
					<tr>
						<td><b>#103</b></td>
						<td class="text-left">Kilian</td>
						<td>3</td>
						<td>Aujourd'hui</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home {
	text-align: center;

	.buttons {
		display: flex;
	}

	.scoreboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		table {
			border-spacing: 0;
			text-align: center;
			border-radius: 8px;
			overflow: hidden;
			// border-bottom: solid 4px rgba(0, 0, 0, 0.25);

			thead {
				background-color: rgba(0, 0, 0, 0.25);

				tr {
					th {
						font-weight: 700;
						padding: 10px 25px;
					}
				}
			}
			tbody {
				background-color: rgba(0, 0, 0, 0.1);

				tr {
					background-color: transparent;
					transition: all 0.3s;

					&:hover {
						background-color: rgba(255, 255, 255, 0.2);
					}

					td {
						padding: 5px 15px;

						&:first-child {
							background-color: rgba(0, 0, 0, 0.075);
						}
					}
				}
			}
		}
	}
}
</style>
