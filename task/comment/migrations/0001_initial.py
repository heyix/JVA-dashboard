# Generated by Django 4.0.4 on 2022-05-07 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('highlightText', models.TextField(default='', verbose_name='highlightText')),
                ('comment', models.TextField(default='', verbose_name='comment')),
                ('lineNumber', models.IntegerField(default=0, verbose_name='lineNumber')),
            ],
        ),
    ]
