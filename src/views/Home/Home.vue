<template>
	<div class="home">
		<h1 class="title">Battle Calculator</h1>
		<div class="buttons">
			<a class="btn-primary" href="create.html">Commencer une<br />nouvelle partie</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.home {
	padding-top: 8%;
	text-align: center;

	.buttons {
		display: flex;
	}

	.tables {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 5%;

		table {
			border-spacing: 0;
			text-align: center;
			border-radius: 8px;
			overflow: hidden;
			border-bottom: solid 4px rgba(0, 0, 0, 0.25);

			thead {
				background-color: rgba(0, 0, 0, 0.25);

				tr {
					th {
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
